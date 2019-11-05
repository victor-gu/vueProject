const Mock = require('mockjs')
Mock.setup({ timeout: 100 });

// 处理不能设置响应头
import { setToken, setExpiration } from '@/utils/auth';

// 登陆
Mock.mock(new RegExp('/api/v1/users/login'), 'post', (options) => {
  let params = JSON.parse(options.body);
  if (params.mobile === 'admin@qq.com' && params.password === '123454') {
    setToken('testToken');
    setExpiration(new Date().getTime() + 1000000000000000)
    return { id: 1 };
  }
});

// 获取用户信息
Mock.mock(new RegExp('/api/v1/users/1'), 'get', (options) => {
  return { name: 'admin', roles: [{ admin: true }] };
});

