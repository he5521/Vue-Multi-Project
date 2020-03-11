const getters = {
  theme: state => state.app.theme,
  userInfo: state => state.user.userInfo,
  navList: state => state.permission.navList,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews
}
export default getters
