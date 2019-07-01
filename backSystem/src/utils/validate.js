export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

// 验证邮箱或手机号码
export function validEmailOrPhone(str) {
  str = str.trim()
  if (str.indexOf('@') >= 0) {
    // 验证邮箱
    var myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/
    if (!myReg.test(str)) {
      return false
    } else {
      return true
    }
  } else {
    // 验证手机号
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
    if (!myreg.test(str)) {
      return false
    } else {
      return true
    }
  }
}

// 验证手机号
export function isvalidPhone(str) {
  var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
  if (!myreg.test(str)) {
    return false
  } else {
    return true
  }
}

// 验证邮箱
export function isvalidEmail(str) {
  var myreg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/
  if (!myreg.test(str)) {
    return false
  } else {
    return true
  }
}
