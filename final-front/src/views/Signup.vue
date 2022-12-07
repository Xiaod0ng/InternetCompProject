<template>
  <el-container>
    <div class="signupPage">
      <div class="title">Sign Up</div>
      <el-form
        :model="signupForm"
        :rules="signupRules"
        ref="signupForm"
        label-width="110px"
        label-position="left"
        status-icon
      >
        <el-form-item label="Name:" prop="name">
          <el-input
            v-model="signupForm.name"
            placeholder="Please input name"
            clearable
          />
        </el-form-item>
        <el-form-item label="Password:" prop="password">
          <el-input
            type="password"
            v-model="signupForm.password"
            placeholder="Please input password"
            show-password
            clearable
          />
        </el-form-item>
        <el-form-item label="Re-password:" prop="confirmPassword">
          <el-input
            type="password"
            v-model="signupForm.confirmPassword"
            placeholder="Please confirm password"
            show-password
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="createAccount"
            >Create Account</el-button
          >
          <el-button type="default" @click="reset">Reset</el-button>
        </el-form-item>
      </el-form>
      <div class="tip">
        Already have an account? <span @click="goTologinPage">Log in</span>
      </div>
    </div>
  </el-container>
</template>

<script>
import http from "../http/http.js";
import { ElMessage } from "element-plus";
export default {
  name: "SignupPage",
  data() {
    // check whether the two password inputs are consistent
    const validateComfirmPassword = (rule, value, callback) => {
      console.log(this.signupForm);
      if (value === this.signupForm.password) {
        callback();
      } else {
        callback(new Error("Please input correct password"));
      }
    };
    return {
      signupForm: {
        name: "",
        password: "",
        confirmPassword: "",
      },
      signupRules: {
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
        confirmPassword: [
          {
            required: true,
            message: "Please confirm password",
            trigger: "blur",
          },
          { validator: validateComfirmPassword, trigger: "blur" },
        ],
      },
    };
  },
  mounted() {},
  methods: {
    // create an account
    createAccount() {
      var that = this;
      this.$refs["signupForm"].validate((valid) => {
        if (valid) {
          http.post("/userSignup", this.signupForm).then((res) => {
            if (res.code === 0) {
              if (res.data.msg == "User already exists") {
                ElMessage({
                  message: res.data.msg,
                  type: "error",
                });
              } else if (res.data.msg == "Create an account successfully") {
                ElMessage({
                  message: res.data.msg,
                  type: "success",
                });
                // // go to login page after 1.5s
                setTimeout(() => {
                  that.$router.push({ name: "login" });
                }, 1500);

                // go to home page after 1.5s
              } else {
                ElMessage({
                  message: "Fail to create an account.",
                  type: "error",
                });
              }
            }
          });
        }
      });
    },
    //reset form
    reset() {
      this.$refs["signupForm"].resetFields();
    },
    // go to login page
    goTologinPage() {
      this.$router.push({ name: "login" });
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
  .signupPage {
    padding: 16px;
    width: 350px;
    height: 255px;
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
