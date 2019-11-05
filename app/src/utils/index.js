// 日期格式化
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
export function test() {
  return 'test';
}

// 根据数组对象每一个key排序，sort方法参数，默认升序
export function compare(prop) {
  return function(obj1, obj2) {
    var val1 = obj1[prop];
    var val2 = obj2[prop];
    if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
      val1 = Number(val1);
      val2 = Number(val2);
    }
    if (val1 < val2) {
      return -1;
    } else if (val1 > val2) {
      return 1;
    } else {
      return 0;
    }
  }
}
