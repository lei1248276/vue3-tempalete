const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://www.github.com/lei1248276.png?size=256',
    nickname: 'Super Admin',
    id: 1,
    org_id: 1
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://www.github.com/lei1248276.png?size=256',
    nickname: 'Normal Editor',
    id: 2,
    org_id: 2
  }
}

export default [
  // user login
  {
    url: '/vue-admin-template/user/login',
    type: 'post',
    response: config => {
      const { username, password } = config.body
      const token = tokens[username]

      // mock error
      if (username !== password) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: '2000',
        data: token,
        result: token
      }
    }
  },

  // get user info
  {
    url: '/vue-admin-template/user/info\.*',
    type: 'get',
    response: config => {
      const token = config.query?.role || 'admin-token'
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: '2000',
        data: info,
        result: info
      }
    }
  },

  // user logout
  {
    url: '/vue-admin-template/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: '2000',
        data: 'success'
      }
    }
  }
]
