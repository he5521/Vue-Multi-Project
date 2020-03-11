import { setVisitedViews, getVisitedViews, removeVisitedViews, setCachedViews, getCachedViews, removeCachedViews } from '@/utils/auth'
const tagsViews = {
  state: {
    visitedViews: getVisitedViews() || [],
    cachedViews: getCachedViews() || []
  },
  mutations: {
    ADD_VISITED_VIEWS: (state, view) => {
      if (state.visitedViews.some(v => v.path === view.path)) {
        state.visitedViews.forEach(item => {
          if (item.path === view.path && item.meta.pname === view.meta.pname) {
            item.isCur = true
          }
          if (item.path !== view.path && item.meta.pname === view.meta.pname) {
            item.isCur = false
          }
        })
        return
      }
      if (view.name === 'home' || view.name === 'apply') return
      state.visitedViews.push({
        isCur: true,
        name: view.name,
        meta: view.meta,
        path: view.path,
        title: view.meta.title || 'no-name'
      })
      setVisitedViews(state.visitedViews)
      if (!view.meta.noCache) {
        state.cachedViews.push(view.name)
        setCachedViews(state.cachedViews)
      }
    },
    DEL_VISITED_VIEWS: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path && view.name !== 'home') {
          state.visitedViews.splice(i, 1)
          break
        }
      }
      setVisitedViews(state.visitedViews)
      for (const i of state.cachedViews) {
        if (i === view.name && view.name !== 'home') {
          const index = state.cachedViews.indexOf(i)
          state.cachedViews.splice(index, 1)
          break
        }
      }
      setCachedViews(state.cachedViews)
    },
    ADD_CACHED_VIEWS: (state, view) => {
      state.cachedViews.push(view.name)
      setCachedViews(state.cachedViews)
    },
    REMOVE_CACHED_VIEWS: (state, view) => {
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i)
          state.cachedViews.splice(index, 1)
          break
        }
      }
      setCachedViews(state.cachedViews)
    },
    DEL_OTHERS_VIEWS: (state, view) => {
      const newVisitedViews = []
      state.visitedViews.forEach((v) => {
        if (v.path === view.path || v.path === '/home') {
          newVisitedViews.push(v)
        }
      })
      state.visitedViews = newVisitedViews
      setVisitedViews(newVisitedViews)
      const newCachedViews = []
      state.cachedViews.forEach((i) => {
        if (i === view.name && i === 'home') {
          newCachedViews.push(i)
        }
      })
      state.cachedViews = newCachedViews
      setCachedViews(newCachedViews)
    },
    DEL_ALL_VIEWS: (state) => {
      state.visitedViews = []
      removeVisitedViews()
      state.cachedViews = []
      removeCachedViews()
    }
  },
  actions: {
    addVisitedViews ({ commit }, view) {
      commit('ADD_VISITED_VIEWS', view)
    },
    delVisitedViews ({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_VISITED_VIEWS', view)
        resolve([...state.visitedViews])
      })
    },
    addCachedViews ({ commit }, view) {
      commit('ADD_CACHED_VIEWS', view)
    },
    removeCachedViews ({ commit }, view) {
      commit('REMOVE_CACHED_VIEWS', view)
    },
    delOthersViews ({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_OTHERS_VIEWS', view)
        resolve([...state.visitedViews])
      })
    },
    delAllViews ({ commit, state }) {
      return new Promise((resolve) => {
        commit('DEL_ALL_VIEWS')
        resolve([...state.visitedViews])
      })
    }
  }
}

export default tagsViews
