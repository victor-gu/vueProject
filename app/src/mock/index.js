const Mock = require('mockjs')
Mock.setup({ timeout: 100 });

import { setToken, setExpiration } from '@/utils/auth';

// 登陆
Mock.mock(new RegExp('/api/v1/users/login'), 'post', (options) => {
  setToken('testToken');
  setExpiration(new Date().getTime() + 1000000000000000)
  return { id: 1, name: 'admin' };
});
