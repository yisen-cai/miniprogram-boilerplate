// import 'miniprogram-api-typings';
/// <reference lib="dom" />
import Config from "../config/config";
import { uuid, wechatLogin } from "./util";

const app = <MyAppOption>(getApp());

// 5xx status code
const serverErrorPattern = new RegExp('^5..$'); // or /^5..$/

// 4xx
const clientErrorPattern = new RegExp('^4..$');

// 3xx
const redirectPattern = new RegExp('^3..$');

// 2xx
const okPattern = new RegExp('^2..$');


/**
 * Upload file function
 * @param filePath The file to be upload.
 * @param folder File path append to OSS_ROOT.
 * @param self Component or Page Instance.
 */
export function uploadFile(filePath: string, folder: string, self: WechatMiniprogram.Component.Instance<any, any, any> | WechatMiniprogram.Page.Instance<any, any>) {
  let key = `${Config.OSS_BUCKET}/${folder}/${uuid()}`;
  // Request oss upload signature.
  ossSignature().then((res: WechatMiniprogram.RequestSuccessCallbackResult) => {
    let signature = <OssSignature>res.data;

    // upload file.
    let uploader = wx.uploadFile({
      url: Config.OSS_ROOT, // 开发者服务器的URL。
      filePath: filePath,
      name: 'file', // 必须填file。
      formData: {
        name: filePath,
        key: key,
        policy: signature.policy,
        OSSAccessKeyId: signature.ossAccessKeyId,
        signature: signature.signature,
        success_action_status: "200",
        'x-oss-security-token': signature.securityToken // 使用STS签名时必传。
      },
      success: (res) => {
        if (res.statusCode === 204) {
          console.log('上传成功');
        }
        self.setData({
          imageSrc: `${Config.OSS_ROOT}/${key}`
        });
      },
      fail: err => {
        console.log(err);
      }
    });

    // Update progress.
    uploader.onProgressUpdate(res => {
      self.setData({
        uploadProgress: res.progress
      });
    });
  }).catch((res: WechatMiniprogram.RequestFailCallback) => {
    console.error(res);
  });
}


function ossSignature() {
  return netRequest('/aliyun/oss-signature', 'GET');
}

/**
 * Send web request.
 * @param url Request url.
 * @param method Request method.
 * @param params Params.
 * @param data Post data.
 */
export function netRequest(
  url: string,
  method: Method,
  params: Map<string, any> | null = null,
  data: any | null = null): Promise<WechatMiniprogram.RequestSuccessCallbackResult> {

  // auth related
  var headers = {}
  var authorization = app.auth?.accessToken
  if (authorization != null) {
    if (isExpired()) {
      // login again to refresh token.
      wechatLogin((res) => {
        let result = <WechatAuthResult>res.data;
        app.auth = result.auth;
        app.user = result.user;
        headers = {
          Authorization: `Bearer ${app.auth?.accessToken}`
        };
      });

    } else {
      headers = {
        Authorization: `Bearer ${app.auth?.accessToken}`
      };
    }
  }
  return createRequestPromise(url, method, params, data, headers);
}


function createRequestPromise(
  url: string,
  method: Method,
  params: Map<string, any> | null = null,
  data: any | null = null,
  headers: Object): Promise<WechatMiniprogram.RequestSuccessCallbackResult> {
  return new Promise<WechatMiniprogram.RequestSuccessCallbackResult>((resolve, reject) => {
    wx.request({
      url: `${Config.API}${url}${resolveParams(params)}`,
      data: data,
      method: method,
      header: headers,
      dataType: "json",
      responseType: "text",
      success: (res: WechatMiniprogram.RequestSuccessCallbackResult) => {
        if (isSuccess(res)) {
          resolve(res);
        } else {
          reject(res);
        }
      },

      fail: (res: WechatMiniprogram.AccessFailCallbackResult) => {
        console.error('request error');
        reject(res);
      },

      complete: (res: WechatMiniprogram.GeneralCallbackResult) => {
        // do something after
      }
    });
  });
}



function isExpired(): boolean {
  return app.auth!!.expiration < new Date().getMilliseconds();
}

/**
 * Request params.
 */
function resolveParams(params: Map<string, string> | null): string {
  if (params != null) {
    let paramsStr = '?'
    params.forEach((value, key) => {
      paramsStr += `${key}=${value}&`;
    });
    return paramsStr.substring(0, paramsStr.length - 1);
  }
  return '';
}


function isSuccess(res: WechatMiniprogram.RequestSuccessCallbackResult): boolean {
  let statusCode = String(res.statusCode);

  return !serverErrorPattern.test(statusCode) && !clientErrorPattern.test(statusCode);
}