import { uploadFile } from "../../utils/network";

type EditorData = {
  formats: any,
  readOnly: boolean,
  placeholder: string,
  editorHeight: number,
  keyboardHeight: number,
  isIOS: boolean,
  safeHeight: number,
  toolBarHeight: number,
  editorCtx: any,
  uploadProgress: number
}

Component
  <EditorData,
    WechatMiniprogram.Component.PropertyOption,
    WechatMiniprogram.Component.MethodOption
  >
  ({
    properties: {
      placeholder: {
        type: String,
        value: "开始输入..."
      },
      editorText: {
        type: String,
        value: '',
      }
    },
    data: {
      formats: {},
      readOnly: false,
      placeholder: '开始输入...',
      editorHeight: 300,
      keyboardHeight: 0,
      isIOS: false,
      safeHeight: 0,
      toolBarHeight: 50,
      editorCtx: null,
      uploadProgress: 0
    },

    methods: {
      attached() {
        this.setData({
          placeholder: this.properties.placeholder
        });

        const { platform, safeArea, model, screenHeight } = wx.getSystemInfoSync();
        let safeHeight;

        if (safeArea) {
          safeHeight = (screenHeight - safeArea.bottom);
        } else {
          safeHeight = 32;
        }
        // this._safeHeight = (safeHeight as number);
        let isIOS = platform === 'ios';
        this.setData({ isIOS, safeHeight, toolBarHeight: isIOS ? safeHeight + 50 : 50 });
        const that = this;
        this.updatePosition(0);
        let keyboardHeight = 0;
        wx.onKeyboardHeightChange(res => {
          if (res.height === keyboardHeight) {
            return;
          }
          keyboardHeight = res.height
          setTimeout(() => {
            wx.pageScrollTo({
              scrollTop: 0,
              success() {
                that.updatePosition(keyboardHeight);
                that.data.editorCtx.scrollIntoView()
              }
            })
          }, 0)

        });
      },

      updateContent(event: any) {
        this.triggerEvent('updateDes', { description: event.detail.html }, {});
      },

      readOnlyChange() {
        this.setData({
          readOnly: !this.data.readOnly
        })
      },

      updatePosition(keyboardHeight: number) {
        const toolbarHeight = 50
        const { windowHeight, platform } = wx.getSystemInfoSync()
        let editorHeight = keyboardHeight > 0 ? (windowHeight - keyboardHeight - toolbarHeight) : windowHeight
        if (keyboardHeight === 0) {
          this.setData({
            editorHeight, keyboardHeight,
            // toolBarHeight: this.data.isIOS ? 50 + this._safeHeight : 50,
            // safeHeight: this._safeHeight,
          })
        } else {
          this.setData({
            editorHeight, keyboardHeight,
            toolBarHeight: 50,
            safeHeight: 0,
          })
        }
      },

      calNavigationBarAndStatusBar() {
        const systemInfo = wx.getSystemInfoSync();
        const { statusBarHeight, platform } = systemInfo;
        const isIOS = platform === 'ios';
        const navigationBarHeight = isIOS ? 44 : 48;
        return statusBarHeight + navigationBarHeight;
      },

      onEditorReady() {
        const that = this;
        wx.createSelectorQuery().in(this).select('#editor').context(function (res) {
          let editorCtx = res.context;
          that.setData({
            editorCtx: editorCtx,
          });
          editorCtx.setContents({
            html: that.properties.editorText,   //这里就是设置默认值的地方（html 后面给什么就显示什么）
            //that.data.content 是我存在 data 里面的数据
            //注意是 this 赋值的 that，如果用 this 就把上面的 function 改成箭头函数
          });
        }).exec();
      },

      blur() {
        this.data.editorCtx.blur();
      },

      format(e: any) {
        let { name, value } = e.target.dataset
        if (!name) return
        console.log('format', name, value)
        this.data.editorCtx.format(name, value)
      },

      onStatusChange(e: any) {
        const formats = e.detail;
        this.setData({ formats });
      },

      insertDivider() {
        this.data.editorCtx.insertDivider({
          success: function () {
            console.log('insert divider success')
          }
        });
      },

      clear() {
        this.data.editorCtx.clear({
          success: function (res: any) {
            console.log("clear success")
          }
        })
      },

      removeFormat() {
        this.data.editorCtx.removeFormat();
      },

      insertDate() {
        const date = new Date();
        const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
        this.data.editorCtx.insertText({
          text: formatDate
        });
      },

      insertImage() {
        const that = this;
        wx.chooseImage({
          count: 1,
          success: function (res) {
            uploadFile(res.tempFilePaths[0], 'editor', that);
          }
        });
      }
    },
  });
