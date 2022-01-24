const getters = {
  uploadUrl: state => state.app.uploadUrl,
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  userId: state => state.user.userId,
  permission_routes: state => state.permission.routes,
  permission_addRoutes: state => state.permission.addRoutes
}
export default getters
