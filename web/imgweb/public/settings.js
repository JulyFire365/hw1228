;(function($){
  var Settings = {
    /**
     * @description 网站标题
     */
    title: 'WH1228',
    /**
     * @type {boolean} true | false
     * @description Whether fix the header
     */
    /**
     * @description 固定头部
     */
    fixedHeader: true,
    /**
     * @description 是否显示 tagsView
     */
    tagsView: true,
    /**
     * @description 记住密码状态下的token在Cookie中存储的天数，默认1天
     */
    tokenCookieExpires: 1,
    /**
     * @description 记住密码状态下的密码在Cookie中存储的天数，默认1天s
     */
    passCookieExpires: 1,
    /**
     * @description 是否只保持一个子菜单的展开
     */
    uniqueOpened: true,
    /**
     * @description token key
     */
    TokenKey: 'USER-TOEKN',

    /**
     * @description 接口地址
     */
    ApiHostUrl: 'http://8.129.51.247',
    /**
     * @description 请求超时时间，毫秒（默认2分钟）
     */
    timeout: 1200000,
    /**
     * @description 是否显示logo
     */
    /**
     * @type {boolean} true | false
     * @description Whether show the logo in sidebar
     */
    sidebarLogo: true,
    /**
     * 是否显示设置的底部信息
     */
    showFooter: true,
    /**
     * 底部文字，支持html语法
     */
    footerTxt: 'xx科技有限公司 ⓒ （2020-2021）保留所有版权',
    /**
     * 备案号
     */
    caseNumber: ''
  }
  if (typeof module === 'object' && module.exports) {
    module.exports = Settings
  }else{
    $.Settings = Settings
  }
})(this)
