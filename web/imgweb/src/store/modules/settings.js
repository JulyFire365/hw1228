// import variables from '@/assets/styles/element-variables.scss'
// import defaultSettings from '@/settings'
// Settings.ApiHostUrl = Settings.ApiHostUrl || '//' + window.location.host
// const defaultSettings = Settings
// const { tagsView, showSettings, fixedHeader, sidebarLogo, uniqueOpened, showFooter, footerTxt, caseNumber, ApiHostUrl } = defaultSettings

const state = {
  /* theme: variables.theme,
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  uniqueOpened: uniqueOpened,
  showFooter: showFooter,
  footerTxt: footerTxt,
  caseNumber: caseNumber,
  ApiHostUrl */
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (Object.prototype.hasOwnProperty.call(state, key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

