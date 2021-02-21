"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../../utils/util");
Page({
    data: {
        logs: [],
    },
    onLoad() {
        this.setData({
            logs: (wx.getStorageSync('logs') || []).map((log) => {
                return util_1.formatTime(new Date(log));
            }),
        });
    },
    btnRequest() {
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSwyQ0FBNkM7QUFHN0MsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLEVBQUU7S0FDVDtJQUVELE1BQU07UUFDSixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFXLEVBQUUsRUFBRTtnQkFDMUQsT0FBTyxpQkFBVSxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7WUFDbEMsQ0FBQyxDQUFDO1NBQ0gsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELFVBQVU7SUFNVixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gbG9ncy50c1xuLy8gY29uc3QgdXRpbCA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3V0aWwuanMnKVxuaW1wb3J0IHsgZm9ybWF0VGltZSB9IGZyb20gJy4uLy4uL3V0aWxzL3V0aWwnXG5pbXBvcnQgeyBoZWxsbyB9IGZyb20gXCIuLi8uLi9hcGkvaGVsbG9cIlxuXG5QYWdlKHtcbiAgZGF0YToge1xuICAgIGxvZ3M6IFtdLFxuICB9LFxuXG4gIG9uTG9hZCgpIHtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgbG9nczogKHd4LmdldFN0b3JhZ2VTeW5jKCdsb2dzJykgfHwgW10pLm1hcCgobG9nOiBzdHJpbmcpID0+IHtcbiAgICAgICAgcmV0dXJuIGZvcm1hdFRpbWUobmV3IERhdGUobG9nKSlcbiAgICAgIH0pLFxuICAgIH0pXG4gIH0sXG5cbiAgYnRuUmVxdWVzdCgpIHtcbiAgICAvLyBoZWxsbygpLnRoZW4ocmVzID0+IHtcbiAgICAvLyAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgLy8gfSkuY2F0Y2gocmVzID0+IHtcbiAgICAvLyAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgLy8gfSk7XG4gIH0sXG59KVxuIl19