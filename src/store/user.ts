import { getToken, removeToken, setToken } from '@/utils/auth'
import { getInfo, login, logout } from '@/api/user'
import { resetRouter } from '@/router'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken(),
    username: '',
    avatar: '',
    introduction: '',
    userId: undefined as number | undefined
  }),
  actions: {
    // * user login
    login(userInfo: { username: string, password: string }): Promise<void> {
      return new Promise((resolve, reject) => {
        login(userInfo).then((response) => {
          const { result: { token }} = response

          this.token = token
          setToken(token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // * get user info
    getInfo() {
      return new Promise((resolve, reject) => {
        getInfo().then((response) => {
          console.log('%c🚀 ~ file: user ~ method: getInfo ~', 'color: #F25F5C;font-weight: bold;', response)
          const { result: { nickname: username, id, avatar }} = response

          this.username = username
          this.userId = id
          this.avatar = avatar
          resolve(response.result)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // * user logout
    logout(): Promise<void> {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          const permissionStore = usePermissionStore()
          const tagsViewStore = useTagsViewStore()

          this.resetToken()
          resetRouter(permissionStore.addRoutes)

          // reset visited views and cached views
          // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
          tagsViewStore.delAllViews()

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // * remove token
    resetToken() {
      this.userId = undefined
      this.token = ''
      removeToken()
    }
  }
})
