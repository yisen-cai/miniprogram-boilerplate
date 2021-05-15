import Notify from '@vant/weapp/notify/notify';
import { inviteUser } from "../../api/api";

type TAddUserData = {
  username: string,
  email: string,
  password: string,
  roles: Array<String>,
  role: string,
  roleIndex: number,
  complete: boolean
}


Page<TAddUserData, WechatMiniprogram.Page.CustomOption>({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    email: '',
    password: '',
    roles: [
      'USER',
      'MANAGER',
      'ADMIN'
    ],
    role: '',
    roleIndex: 0,
    complete: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  initData() {
    this.setData({
      username: '',
      password: '',
      email: '',
      roleIndex: 0,
      complete: false
    })
  },

  bindPickerChange(event: any) {
    this.setData({
      dialogShow: true
    });
    this.setData({
      roleIndex: event.detail.value
    });
  },

  validate() {
    if (this.data.email == '') {
      Notify({ type: 'danger', message: '邮箱不可为空!' });
      throw 'input data not valid!';
    }
    if (this.data.username == '') {
      Notify({ type: 'danger', message: '用户名不可为空!' });
      throw 'input data not valid!';
    }
    if (this.data.password == '') {
      Notify({ type: 'danger', message: '密码不可为空!' });
      throw 'input data not valid!';
    }
  },

  inviteUser(event: any) {
    this.validate();
    let self = this;
    inviteUser({
      username: this.data.username,
      password: this.data.password,
      email: this.data.email,
      role: this.data.roles[this.data.roleIndex] as string
    }).then(res => {
      self.setData({
        complete: true
      });
    }).catch(err => {
      Notify({ type: 'danger', message: '参数有误, 请检查!' });
    })
  },

  continueInvite(event: any) {
    this.initData();
  },

  returnHome(event: any) {
    wx.navigateBack();
  }
});