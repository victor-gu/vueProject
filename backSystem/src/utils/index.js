export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

// 格式化时间
export function formatDate(data, fmt) {
  if (!data || !data.getTime()) {
    return '';
  } else {
    var o = {
      'M+': data.getMonth() + 1,
      'D+': data.getDate(),
      'h+': data.getHours(),
      'm+': data.getMinutes(),
      's+': data.getSeconds()
    };
    if (/(Y+)/.test(fmt)) {
      var resYear = String(data.getFullYear()).substring(4 - RegExp.$1.length);
      fmt = fmt.replace(RegExp.$1, resYear);
    }
    for (var str in o) {
      var reg = new RegExp('(' + str + ')');
      if (reg.test(fmt)) {
        var resDate = RegExp.$1.length > 1 ? ('00' + o[str]).substring(String(o[str]).length) : o[str];
        fmt = fmt.replace(RegExp.$1, resDate);
      }
    }
    return fmt;
  }
}

// 清空对象
export function emptyObject(obj) {
  Object.keys(obj).forEach(function(key) {
    obj[key] = '';
  });
}

/**
 * [生成一个范围内的随机整数]
 * @param  {Number} min [范围最小值]
 * @param  {Number} max [范围内最大值]
 * @return {Number}     [返回随机整数]
 */
export function randomNumber(min, max) {
  return parseInt(Math.random() * (max - min + 1)) + min
}

import axios from './globalAxios';
// import { base64Decode } from '@/utils/auth';

// 获取图片
export function image(id, cb) {
  if (id !== 0) {
    axios({
      url: '/attachments/' + id,
      method: 'get',
      responseType: 'arraybuffer'
    }).then((response) => {
      var mimeType = response.headers['content-type'].toLowerCase();
      var imgBase64 = new Buffer(response.data, 'binary').toString('base64');
      cb('data:' + mimeType + ';base64,' + imgBase64);
    }).catch((error) => {
      console.log(error);
    });
  }
}

// 文件下载
// export function download(val) {
//   axios({
//     method: 'get',
//     url: '/attachments/' + val,
//     responseType: 'arraybuffer'
//   }).then(function(resp) {
//     var mimeType = resp.headers['content-type'].toLowerCase();
//     const blob = new Blob([resp.data], {
//       type: mimeType
//     });
//     const aLink = document.createElement('a');
//     const evt = document.createEvent('HTMLEvents');
//     evt.initEvent('click', true, true);
//     aLink.download = base64Decode(resp.headers['content-disposition'].split('=')[1]);
//     aLink.href = URL.createObjectURL(blob);
//     aLink.click();
//   }).catch(function() {});
// }

// 复制对象
export function cloneObject(val) {
  return JSON.parse(JSON.stringify(val));
}

// 清除对象空键值对
export function clearObjectKey(obj) {
  for (const key in obj) {
    if (!obj[key]) {
      delete obj[key]
    }
  }
  return obj;
}

export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}
