<template>
  <div class="container main">
    <div class="login">
      <img src="../assets/images/login/login-draw.png" alt />
      <div class="form">
        <p>思路后台管理系统</p>
        <el-form :model="form" :rules="rules" style="padding-top:53px" ref="loginForm">
          <el-form-item prop="username" class="form-input-wrap">
            <el-input
              placeholder="请输入用户名"
              v-model="form.username"
            >
              <i slot="suffix"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" class="form-input-wrap">
            <el-input
              type="password"
              placeholder="请输入密码"
              v-model="form.password"
            >
              <i slot="suffix"></i>
            </el-input>
          </el-form-item>
        </el-form>
        <div class="form-rememberUser">
          <div :class="[{checked: isChecked}, 'checkbox']" @click="handleRemenberPassword" />记住密码
        </div>
        <div class="login-btn" @click="handleLogin('loginForm')">立即登录</div>
      </div>
    </div>
  </div>
</template>

<script>
/**
*@file 思路用户登录界面
*@author <lvzx>
*@version 1.0
*/
import { toRefs, reactive, onMounted } from '@vue/composition-api';
import { Message } from 'element-ui';
import { resetSize } from '@/utils/common';

export default {
  name: 'Login',
  setup(props, { root: { $router, $store } }) {
    const state = reactive({
      // 判断用户名密码是否检验通过
      isChecked: false,
      isShow: false,
      // 表单数据
      form: {
        // 用户名
        username: '',
        // 密码
        password: '',
      },
      // 表单验证规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码至少为6位', trigger: 'blur' },
        ],
      },
      timer: null,
    });
    const methods = {
      /**
       * 点击checkbox框后记住密码
       * @name handleRemenberPassword
       */
      handleRemenberPassword() {
        state.isChecked = !state.isChecked;
      },
      /**
       * 点击“立即登录”按钮后登录
       * @async
       * @name handleLogin
       */
      async handleLogin(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            /**
             * 判断是否登录成功
             * @type {boolean}
             */
            const isSuccess = await $store.dispatch(
              'user/login',
              {
                userName: state.form.username,
                password: state.form.password,
              },
            );
            // 判断是否要跳转到首页
            if (isSuccess) {
              $router.push('Home');
            } else {
              Message.error({
                message: '用户名或密码错误',
              });
            }
            // 判断是否记住密码
            if (state.isChecked && isSuccess) {
              localStorage.setItem('user', JSON.stringify({
                name: state.form.username,
                password: state.form.password,
              }));
            } else {
              localStorage.removeItem('user');
            }
          }
        });
      },
    };
    onMounted(() => {
      // 按比例缩放
      resetSize('.login', 1920, 1080);
      window.onresize = () => {
        resetSize('.login', 1920, 1080);
      };
      /**
       * localStorage中键名为user的值
       * @type {?string}
       */
      let user = localStorage.getItem('user');
      // 判断localStorage是否存有用户信息
      if (user !== null) {
        user = JSON.parse(user);
        state.form.username = user.name;
        state.form.password = user.password;
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
.main{
  position: relative;
  .alert{
    position: absolute;
    left: calc(50% - 500px);
    top: 100px;
    width: 1000px;
  }
}
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
        margin-bottom: 30px;
        /deep/.el-input__inner{
          font-size: 16px;
          line-height: 16px;
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
        /deep/input.el-input__inner:last-child{
          margin-bottom: 3px;
        }
        i {
          position: absolute;
          right: 16px;
          top: 13px;
          display: block;
          width: 30px;
          height: 30px;
          background: url("../assets/images/login/user.png");
        }
        &:last-child i{
          background: url("../assets/images/login/password.png");
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
