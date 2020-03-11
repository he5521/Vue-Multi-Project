import { setTheme, getTheme } from '@/utils/auth'

const app = {
  state: {
    theme: getTheme() || 'light-theme'
  },
  mutations: {
    SET_THEME: (state, theme) => {
      state.theme = theme
      setTheme(theme)
    }
  },
  actions: {
    setTheme ({ commit }, theme) {
      commit('SET_THEME', theme)
    }
  }
}

export default app
