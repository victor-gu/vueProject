import Cookies from 'js-cookie';
// import Base64 from 'js-base64';

const TokenKey = 'teamolyToken';
const UserId = 'teamolyUserId';
const Expiration = 'teamolyExpiration';

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserId() {
  return Cookies.get(UserId)
}

export function setUserId(userId) {
  return Cookies.set(UserId, userId)
}

export function removeUserId() {
  return Cookies.remove(UserId)
}

export function getExpiration() {
  return Cookies.get(Expiration)
}

export function setExpiration(timestrap) {
  return Cookies.set(Expiration, timestrap)
}

export function removeExpiration() {
  return Cookies.remove(Expiration)
}

