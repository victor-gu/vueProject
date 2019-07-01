import request from '@/utils/request'

// 登陆
export function login(email_or_mobile, password) {
  return request({
    url: '/users/login',
    method: 'post',
    data: {
      email: email_or_mobile,
      mobile: email_or_mobile,
      password: password
    }
  })
}

// 获取用户信息
export function getInfo(id) {
  const expand = '?expand=roles'
  return request({
    url: '/users/' + id + expand,
    method: 'get'
  })
}

// token过期重新获取
export function refresh(timestrap) {
  return request({
    url: '/users/refresh',
    method: 'get'
  })
}

// 登出
// export function logout() {
//   return request({
//     url: '/user/logout',
//     method: 'post'
//   })
// }
