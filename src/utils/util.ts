import Config from "../config/config"

export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

const formatNumber = (n: number) => {
  const s = n.toString();
  return s[1] ? s : `0 + ${s}`;
}


export const getTimeInfo = (timestamp: number) => {
  var nowTime = new Date().getTime()
  var diffValue = nowTime - timestamp
  var _min = diffValue / (60 * 1000)
  if (_min < 1) {
    return '刚刚'
  } else if (_min >= 1 && _min < 10) {
    return '1分钟前'
  } else if (_min >= 10 && _min < 30) {
    return '10分钟前'
  } else if (_min >= 30 && _min < 60) {
    return '半小时前'
  } else if (_min >= 60 && _min < 60 * 24) {
    return Math.floor(_min / 60) + '小时前'
  } else if (_min >= 60 * 24 && _min < 60 * 24 * 7) {
    return Math.floor(_min / (60 * 24)) + '天前'
  } else {
    return formatTime(new Date(timestamp))
  }
}

const numberReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/
const emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/


/**
 * 验证手机号码有效性
 */
export function validateNumber(number: string): boolean {
  return numberReg.test(number) || '' === number
}

/**
 * 验证手机邮箱有效性
 */
export function validateEmail(email: string): boolean {
  return emailReg.test(email) || '' === email
}

/**
 * Wechat login to exchange accessToken.
 * @param success Success callback.
 */
export function wechatLogin(success: WechatMiniprogram.RequestSuccessCallback) {
  wx.login({
    success: res => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      if (res.code) {
        wx.request({
          url: Config.API + '/wechat/mini-program/login',
          method: 'POST',
          data: {
            jsCode: res.code
          },
          success: success
        });
      }
    },
  });
}

export const uuid = () => {
  var s:string[] = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4" // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((<any>s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  // s[8] = s[13] = s[18] = s[23] = "-"

  var uuid = s.join("");
  return uuid;
}


export function pageParamsOf(page: number = 0, size: number = 20, sort: string | null = null): Map<string, any> {
  let params = new Map<string, any>();
  params.set('page', page);
  params.set('size', size);
  if (sort != null) {
    params.set('sort', sort);
  }
  return params;
}

export function notEmptyString(str: string) {
  return str != '';
} 