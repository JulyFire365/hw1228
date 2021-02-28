// import defaultSettings from '@/settings'
import router from '@/router'
import store from '@/store'
const defaultSettings = Settings

const title = defaultSettings.title

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}

export function setTagTitle(pageTitle, replaceAll) {
  const route = router.currentRoute
  if (pageTitle) {
    store.dispatch('tagsView/updateVisitedView', {
      title: replaceAll ? `${pageTitle}` : `${route.meta.title} - ${pageTitle}`,
      path: route.path
    })
  }
}
