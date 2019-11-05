import request from '@/utils/request'
export function login(email_or_mobile, password, deviceUuid) {
  let expand = '?expand=device.station'
  return request({
    url: `/users/login${expand}`,
    method: 'post',
    data: {
      email: email_or_mobile,
      mobile: email_or_mobile,
      password: password,
      deviceUuid: deviceUuid
    }
  })
}
