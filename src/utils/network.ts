// import 'miniprogram-api-typings';
/// <reference lib="dom" />

// 5xx status code
const serverErrorPattern = new RegExp('^5..$'); // or /^5..$/

// 4xx
const clientErrorPattern = new RegExp('^4..$');

// 3xx
const redirectPattern = new RegExp('^3..$');

// 2xx
const okPattern = new RegExp('^2..$');


export function netRequest(url: string, method: Method, params: Map<string, string>, data: any): void {
  // let reqURL = url
  let promise = new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {},
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
        console.error(`request error`)
        reject(res);
      },

      complete: (res: WechatMiniprogram.GeneralCallbackResult) => {
        // do something after
      }
    })
  })
}


/**
 * Request params.
 */
function resolveParams(params: Map<string, string> | null): string {
  let searchParams = new URLSearchParams();
  let paramsStr = ''
  if (params != null) {
    params.forEach((key, value) => {
      searchParams.append(key, value);
    })
    paramsStr = `?${searchParams.toString()}`
  }
  return paramsStr;
}



function isSuccess(res: WechatMiniprogram.RequestSuccessCallbackResult): boolean {
  let statusCode = String(res.statusCode);

  return !serverErrorPattern.test(statusCode) && !clientErrorPattern.test(statusCode);
}