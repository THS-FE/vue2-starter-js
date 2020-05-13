<template>
  <div class="container">
    <div class="login">
      <img src="../assets/images/login/login-draw.png" alt />
      <div class="form">
        <p>思路后台管理系统</p>
        <div class="form-user form-input-wrap">
          <input type="text" placeholder="请输入用户名" v-model="username" />
          <i></i>
        </div>
        <div class="form-password form-input-wrap">
          <input type="text" placeholder="请输入密码" v-model="password" />
          <i></i>
        </div>
        <div class="form-rememberUser">
          <div :class="[{checked: isChecked}, 'checkbox']" @click="handleRemenberPassword" />记住密码
        </div>
        <div class="login-btn" @click="handleLogin">立即登录</div>
      </div>
    </div>
  </div>
</template>

<script>
import { toRefs, reactive, onMounted } from '@vue/composition-api';

export default {
  name: 'Login',
  setup(props, { root: { $router, $store } }) {
    const state = reactive({
      isChecked: false,
      username: '',
      password: '',
    });
    const methods = {
      handleRemenberPassword() {
        state.isChecked = !state.isChecked;
      },
      async handleLogin() {
        const isJump = await $store.dispatch('user/login', { userName: state.username, password: state.password });
        if (isJump) {
          $router.push('Home');
        }
        if (state.isChecked) {
          localStorage.setItem('user', JSON.stringify({
            name: state.username,
            password: state.password,
          }));
        }
      },
    };
    onMounted(() => {
      let user = localStorage.getItem('user');
      if (user !== null) {
        user = JSON.parse(user);
        state.username = user.name;
        state.password = user.password;
      }
    });
    return {
      ...toRefs(state),
      ...methods,
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: url("../assets/images/login/bg.jpg") center center/cover no-repeat;
  .login {
    display: flex;
    justify-content: space-between;
    padding: 86px 185px 24px 90px;
    box-sizing: border-box;
    width: 1260px;
    height: 620px;
    background: #fff;
    border-radius: 10px;
    img {
      width: 448px;
      height: 508px;
    }
    .form {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 440px;
      height: 100%;
      p {
        line-height: 32px;
        font-size: 33px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        margin: 0;
      }
      .form-input-wrap {
        position: relative;
        input {
          font-size: 16px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          width: 440px;
          height: 56px;
          border: 1px solid rgba(153, 153, 153, 0.5);
          border-radius: 4px;
          padding: 20px 13px 20px 22px;
          box-sizing: border-box;
        }
        i {
          position: absolute;
          right: 16px;
          top: 13px;
          display: block;
          width: 30px;
          height: 30px;
        }
      }
      .form-user {
        margin-top: 53px;
        i {
          background: url("../assets/images/login/user.png");
        }
      }
      .form-password {
        margin: 30px 0 25px 0;
        i {
          background: url("../assets/images/login/password.png");
        }
      }
      .form-rememberUser {
        display: flex;
        align-items: center;
        align-self: start;
        font-size: 18px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 18px;
        height: 18px;
        .checkbox {
          box-sizing: border-box;
          width: 16px;
          height: 16px;
          margin-right: 10px;
          background: #fff;
          border: 1px solid rgba(153, 153, 153, 1);
          border-radius: 3px;
          cursor: pointer;
        }
        .checked {
          background: url("../assets/images/login/checked.png") center
            center/cover;
          border: none;
        }
      }
      .login-btn {
        font-size: 24px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 56px;
        text-align: center;
        cursor: pointer;
        width: 440px;
        height: 56px;
        background: rgba(77, 105, 246, 1);
        border-radius: 4px;
        margin-top: 90px;
      }
    }
  }
}
</style>
