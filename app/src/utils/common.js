export default {
    cookie: {
        /**
         * [写入修改cookie]
         * @param {String} name   [cookie名]
         * @param {String} val    [cookie值]
         * @param {[Object]} params [cookie参数]
            * expires {Date} 
            * path    {String}
            * domain  {String}
            * secure  {Boolean}
         */
        set: function(name, val, params){
            // params={expires,path,domain,secure}
    
            // cookie名与cookie值
            var cookieStr = name + '=' + val;
            params = params || {};
            // 有效期
            if(params.expires){
                cookieStr += ';expires=' + params.expires.toUTCString();
            }
            // 路径
            if(params.path){
                cookieStr += ';path=' + params.path;
            }
            // 域名
            if(params.domain){
                cookieStr += ';domain=' + params.domain;
            }
            // 安全性
            if(params.secure){
                cookieStr += ';secure';
            }
            document.cookie = cookieStr;
        },
    
    
        /**
         * [获取cookie]
         * @param  {String} name [description]
         * @return {[type]}      [description]
         */
        get: function(name){
            var cookies = document.cookie;
    
            // 如果cookie不存在，直接返回空字符串
            if(cookies.length===0){
                return '';
            }
    
            var res = '';
    
            cookies = cookies.split('; ');
            for(var i=0; i<cookies.length; i++){
                var arr = cookies[i].split('=');
                if(arr[0] === name){
                    res = arr[1];
                    break;
                }
            }
            return res;
        },
    
    
        /**
         * [删除cookie]
         * @param  {String} name [删除cookie]
         */
        remove: function(name){
            var now = new Date();
            now.setDate(now.getDate()-10);
            // document.cookie = name + '=x;expires=' + now.toUTCString(); 
            this.set(name,'x',{expires:now});
        }
    }
};