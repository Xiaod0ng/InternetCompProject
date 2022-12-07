<template>
  <el-container>
    <div class="loginPage">
      <div class="title">Log In</div>
      <el-form
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        label-width="95px"
        label-position="left"
        status-icon
      >
        <el-form-item label="Name:" prop="name">
          <el-input
            v-model="loginForm.name"
            placeholder="Please input name"
            clearable
          />
        </el-form-item>
        <el-form-item label="Password:" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            placeholder="Please input password"
            show-password
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">Log In</el-button>
          <el-button type="default" @click="reset">Reset</el-button>
        </el-form-item>
      </el-form>
      <div class="tip">
        Don't have an account? <span @click="goToSignupPage">Sign up</span>
      </div>
    </div>
  </el-container>
</template>

<script>
import http from "../http/http.js";
import { ElMessage } from "element-plus";
export default {
  name: "LoginPage",
  data() {
    return {
      loginForm: {
        name: "",
        password: "",
      },
      loginRules: {
        name: [
          {
            required: true,
            message: "Please input name",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Please input password",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {},
  methods: {
    // login
    login() {
      var that = this;
      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          http.get("/userLogin", this.loginForm).then((res) => {
            if (res.code === 0) {
              if (res.data.msg == "Login success") {
                ElMessage({
                  message: "Log in successful.",
                  type: "success",
                });
                // go to home page after 1.5s
                setTimeout(() => {
                  that.$router.push({ name: "home" });
                }, 1500);
              } else {
                ElMessage({
                  message: "Please input correct user name and password.",
                  type: "error",
                });
              }
            }
          });
        }
      });
    },
    // reset form
    reset() {
      this.$refs["loginForm"].resetFields();
    },
    // go to sign up page
    goToSignupPage() {
      this.$router.push({ name: "signup" });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.el-container {
  padding-top: 60px;
  align-items: center;
  justify-content: center;
  .loginPage {
    padding: 16px;
    width: 350px;
    height: 205px;
    border: 1.5px solid;
    border-color: #a8abb2;
    border-radius: 20px;
    .title {
      font-size: 20px;
      font-weight: 700;
    }
    form {
      margin-top: 16px;
    }
    .tip {
      font-size: 12px;
      color: #606266;
      span {
        text-decoration: underline;
        cursor: pointer;
      }
      span:hover {
        color: #409eff;
      }
    }
  }
}
</style>
