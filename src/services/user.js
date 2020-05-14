/**
 * 有关于用户的服务，在此模块可以做数据请求及数据处理
 * @module services/user
 */
import config from './config';
import service from '../utils/request';

/**
 * 请求用户信息的数据，并在响应结果中查找是否有该用户并检查用户名和密码是否匹配
 * @param {string} userName - 用户名
 * @param {string} password - 密码
 * @returns {boolean} 是否跳转页面
 */
export async function login({ userName, password }) {
  const res = await service(config.loginUrl);
  // 查看响应数据中是否有与用户名相同的数据
  const user = res.data.data.find((val) => val.name === userName);
  // 判断是否跳转到首页
  let isJump = false;
  // 判断用户是否存在
  if (user) {
    // 判断该用户用户名和密码是否匹配
    if (user.password === password) {
      isJump = true;
    }
  }
  return isJump;
}

// FIXME:若需要新增函数则删掉该行
export const test = 'login';
