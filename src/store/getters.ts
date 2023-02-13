const getters = {
  uploadUrl: (state: any) => state.app.uploadUrl,
  sidebar: (state: any) => state.app.sidebar,
  size: (state: any) => state.app.size,
  device: (state: any) => state.app.device,
  visitedViews: (state: any) => state.tagsView.visitedViews,
  cachedViews: (state: any) => state.tagsView.cachedViews,
  token: (state: any) => state.user.token,
  avatar: (state: any) => state.user.avatar,
  name: (state: any) => state.user.name,
  introduction: (state: any) => state.user.introduction,
  userId: (state: any) => state.user.userId,
  permission_routes: (state: any) => state.permission.routes,
  permission_addRoutes: (state: any) => state.permission.addRoutes
}
export default getters
