import { uuid } from '../../utils/util';
import config from '../../config/config';
import { uploadFile } from '../../utils/network';

Component({
  properties: {
    width: {
      type: Number,
      value: 160
    },
    height: {
      type: Number,
      value: 160
    },
    cutRatio: {
      type: Number,
      value: 1
    },
    cropperRatio: {
      type: Number,
      value: 1
    },
    imageKey: {
      type: String,
      value: 'avatar'
    }
  },

  data: {
    imageSrc: 'https://oss.yisen614.top/background/image-back.png',
    cropperWidth: 720,
    showCropper: false,
    uploadProgress: 0
  },

  lifetimes: {

  },

  methods: {
    hideCut() {
      this.setData({
        showCropper: false
      });
      const img = arguments[0].detail;
      if (img && img.path) {
        console.log(img.path);

        this.setData({
          imageSrc: img.path,
          uploadProgress: 0
        });
        // this.uploadImage(img.path);
        uploadFile(img.path, 'avatar', this);
      }
    },

    choose() {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success(res) {
          const src = res.tempFilePaths[0];
          console.log(src);
        },

        fail(res) {
        }
      });
    },

    chooseImage() {
      this.setData({
        showCropper: true
      });
    }
  }
})