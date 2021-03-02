import { constantRoutes } from '@/router'
/* Layout */
import Layout from '@/layout'
// import { buildMenus, getUserMenu } from '@/api/system/menu'
// import asyncRoutes from '@/router/asyncRoutes'
// import { getUserMenu } from '@/api/user'
const getUserMenu = ()=>{}
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

export const loadView = (view) => {
  return (resolve) => require([`@/views/${view}`], resolve)
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.component) {
        if (tmp.component === 'Layout') { // Layout组件特殊处理
          tmp.component = Layout
        } else {
          tmp.component = loadView(tmp.component)
        }
        if (tmp.name && tmp.name.indexOf('@') > -1) {
          tmp.redirect = 'noRedirect'
        }
        if (tmp.path && tmp.path.indexOf('/:') > -1) {
          console.warn(tmp)
          tmp.hidden = true
        }
        if (tmp.children && tmp.children.length) {
          tmp.children = filterAsyncRoutes(tmp.children, roles)
        }
        res.push(tmp)
      }
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise((resolve, reject) => {
      getUserMenu().then(({ result }) => {
        let data = result
        if (process.env.NODE_ENV == 'development') {
          data = result
        }
        const accessedRoutes = filterAsyncRoutes(data, roles)
        // 404 page must be placed at the end !!!
        accessedRoutes.push({ path: '*', redirect: '/404', hidden: true })
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
