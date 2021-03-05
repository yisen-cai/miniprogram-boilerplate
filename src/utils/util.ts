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
  const s = n.toString()
  return s[1] ? s : `0 + ${s}`
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
  var s = [];
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