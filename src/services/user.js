import config from './config';
import service from '../utils/request';

export async function login({ userName, password }) {
  const res = await service(config.loginUrl);
  const user = res.data.find((val) => val.name === userName);

  // 决定是否跳转到home
  let isJump = false;
  if (user) {
    if (user.password === password) {
      isJump = true;
    }
  }
  return isJump;
}

export default {
  login,
};
