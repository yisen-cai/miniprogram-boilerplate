import { getArticles, search, searchHistories, searchSuggestions } from "../../api/api";
import { pageParamsOf } from "../../utils/util";

const app = getApp();

type SearchDataOption = {
  tabs: Array<any>,
  histories: Array<API.HistoryDTO>,
  suggestions: Array<any>,
  searchText: string,
  showSuggestions: boolean,
  activeTab: number,
  articles: PageData<ArticleDTO>,
  tags: PageData<TagDTO>,
  questions: PageData<QuestionDTO>,
  tests: PageData<TestDTO>,
  users: PageData<UserDTO>
}


Page<SearchDataOption, WechatMiniprogram.Page.CustomOption>({

  /**
   * 页面的初始数据
   */
  data: {
    searchText: '',
    showSuggestions: true,
    histories: [],
    suggestions: [],
    tabs: [
      {
        title: '文章',
      },
      {
        title: '标签',
      },
      {
        title: '试题',
      },
      {
        title: '测评',
      },
      {
        title: '用户'
      }
    ],
    activeTab: 0,
    articles: {
      entities: [],
      index: 0,
      hasNext: true
    },
    tags: {
      entities: [],
      index: 0,
      hasNext: true
    },
    questions: {
      entities: [],
      index: 0,
      hasNext: true
    },
    tests: {
      entities: [],
      index: 0,
      hasNext: true
    },
    users: {
      entities: [],
      index: 0,
      hasNext: true
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options: any) {
    // load suggestions and histories
    searchSuggestions().then(res => {
      let results = <PageResult<SearchWordDTO>>res.data;
      this.setData({
        suggestions: results.entities
      });
    });

    searchHistories().then(res => {
      let results = <PageResult<API.HistoryDTO>>res.data;
      this.setData({
        histories: results.entities
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    let self = this;
    // app.loginReadyCallback = res => {
    //   global.indexPage().then(data => {
    //     this.setData(data)
    //     this.setData({
    //       loading: false
    //     })
    //   }).catch((res) => {
    //     console.log(res)
    //     this.setData({
    //       loading: false
    //     })
    //   });
    // }
    this.initPageData();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.initPageData();
    let params = this.generatePageParams();
    wx.showToast({
      title: '加载中...',
      icon: 'loading'
    });
    if (params != null)
      this.setPageData(params, true);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    let params = this.generatePageParams();
    if (params != null)
      this.setPageData(params);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(opts: WechatMiniprogram.Page.IShareAppMessageOption): WechatMiniprogram.Page.ICustomShareContent {
    console.log(opts.target);
    return {};
  },

  toggleSuggestions(event: any) {
    this.setData({
      showSuggestions: !this.data.showSuggestions
    });
  },


  onTabClick(event: any) {
    const index = event.detail.index;
    this.setData({
      activeTab: index
    });
    // TODO: load first page data.
    let params = this.generatePageParams();
    if (params != null)
      this.setPageData(params);
  },

  handleClick(event: any) {

  },

  search(event: any) {
    this.setData({
      searchText: event.detail.searchText
    });
  },

  clearText(event: any) {
    this.setData({
      searchText: ''
    });
    this.initPageData();
  },

  searchResult(event: any) {
    // TODO: trigger search
    this.initPageData();
    this.setData({
      searchText: event.detail.searchText
    });
    let params = this.generatePageParams();
    if (params != null)
      this.setPageData(params);
  },

  initPageData() {
    this.setData({
      articles: {
        entities: [],
        index: 0,
        hasNext: true
      },
      tags: {
        entities: [],
        index: 0,
        hasNext: true
      },
      questions: {
        entities: [],
        index: 0,
        hasNext: true
      },
      tests: {
        entities: [],
        index: 0,
        hasNext: true
      },
      users: {
        entities: [],
        index: 0,
        hasNext: true
      }
    });
  },

  deleteUserHistory(event: any) {
    let index = <number>event.detail.index;
    let histories = this.data.histories;
    histories.splice(index, 1);
    this.setData({
      histories: histories
    });
  },

  setPageData(params: Map<string, any>, stopLoading: boolean = false) {
    let self = this;
    search(params!!).then(res => {
      let page;
      if (stopLoading)
        wx.stopPullDownRefresh({
          complete(res) {
            wx.hideToast();
            wx.hideNavigationBarLoading();
          }
        });
      switch (this.data.activeTab) {
        case 0:
          page = <SearchResult<ArticleDTO>>res.data;
          let articles = self.data.articles.entities.concat(page.articles!!.entities);
          this.setData({
            articles: {
              entities: articles,
              index: self.data.articles.index + 1,
              hasNext: page.articles!!.hasNext
            }
          });
          break;
        case 1:
          page = <SearchResult<TagDTO>>res.data;
          let tags = self.data.tags.entities.concat(page.tags!!.entities);
          this.setData({
            tags: {
              entities: tags,
              hasNext: page.tests!!.hasNext,
              index: self.data.tags.index + 1
            }
          });
          break;
        case 2:
          page = <SearchResult<QuestionDTO>>res.data;
          let questions = self.data.questions.entities.concat(page.questions!!.entities);
          this.setData({
            questions: {
              entities: questions,
              hasNext: page.questions!!.hasNext,
              index: self.data.questions.index + 1
            }
          });
          break;

        case 3:
          page = <SearchResult<TestDTO>>res.data;
          let tests = self.data.tests.entities.concat(page.tests!!.entities);
          this.setData({
            tests: {
              entities: tests,
              hasNext: page.tests!!.hasNext,
              index: self.data.tests.index + 1
            }
          });
          break;

        case 4:
          page = <SearchResult<UserDTO>>res.data;
          let users = self.data.users.entities.concat(page.
            users!!.entities);

          this.setData({
            users: {
              entities: users,
              hasNext: page.users!!.hasNext,
              index: self.data.users.index + 1
            }
          });
          break;
        default:
          break;
      }
    }).catch(err => {
      console.error(err);
    });
  },

  generatePageParams(): Map<string, any> | null {
    let params: Map<string, any> = new Map<string, any>();
    params.set("keyword", this.data.searchText);
    params.set("size", 20);
    switch (this.data.activeTab) {
      case 0:
        if (!this.data.articles.hasNext)
          return null;
        params.set("page", this.data.articles.index);
        params.set('tab', "article");
        break;
      case 1:
        if (!this.data.tags.hasNext)
          return null;
        params.set("page", this.data.tags.index);
        params.set('tab', 'tag');
        break;
      case 2:
        if (!this.data.questions.hasNext)
          return null;
        params.set("page", this.data.questions.index);
        params.set('tab', 'question');
        break;
      case 3:
        if (!this.data.tests.hasNext)
          return null;
        params.set("page", this.data.tests.index);
        params.set('tab', 'test');
        break;
      case 4:
        if (!this.data.users.hasNext)
          return null;
        params.set("page", this.data.users.index);
        params.set('tab', 'user');
        break;
      default:
        params.set('tab', 'article');
        break;
    }
    return params;
  }
})