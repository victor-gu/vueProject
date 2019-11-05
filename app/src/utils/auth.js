import stores from 'store';

const TokenKey = 'appToken';
const UserId = 'appUserId';
const Expiration = 'appExpiration';

export function getToken() {
  return stores.get(TokenKey)
}

export function setToken(token) {
  return stores.set(TokenKey, token)
}

export function removeToken() {
  return stores.remove(TokenKey)
}

export function getUserId() {
  return stores.get(UserId)
}

export function setUserId(userId) {
  return stores.set(UserId, userId)
}

export function removeUserId() {
  return stores.remove(UserId)
}

export function getExpiration() {
  return stores.get(Expiration)
}

export function setExpiration(timestrap) {
  return stores.set(Expiration, timestrap)
}

export function removeExpiration() {
  return stores.remove(Expiration)
}

