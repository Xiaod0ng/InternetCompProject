<template>
  <div class="menuCom">
    <div
      class="userInfo"
      :style="`display: ${isClose === false ? 'inline' : 'none'}`"
      :class="`${
        closeDisappear === false ? 'animationAppear' : 'animationUserDisappear'
      }`"
      @click="gotoHomePage"
    >
      <el-icon class="userIcon" size="35px"><Avatar /></el-icon>
      <div>{{ userName }}</div>
    </div>
    <div
      class="userInfoClose"
      :style="`display: ${isClose === false ? 'none' : 'inline'}`"
      :class="`${openDisappear === false ? '' : 'animationDisappear'}`"
      @click="gotoHomePage"
    >
      <el-icon class="userIconClose" size="20px"><Avatar /></el-icon>
    </div>
    <el-menu
      default-active=""
      v-if="isMenu"
      :collapse="isCollapse"
      @select="getMenuIndex"
    >
      <el-menu-item index="note">
        <el-icon><EditPen /></el-icon>
        <span>Note</span>
      </el-menu-item>
      <el-menu-item index="todo">
        <el-icon><Calendar /></el-icon>
        <span>Todo List</span>
      </el-menu-item>
    </el-menu>
    <el-button
      class="logoutbutton"
      type="info"
      @click="logout"
      :style="`display: ${isClose === false ? 'inline' : 'none'}`"
      :class="`${
        closeDisappear === false ? 'animationAppear' : 'animationDisappear'
      }`"
      >Log Out</el-button
    >
    <el-icon
      :style="`display: ${isClose === false ? 'inline' : 'none'}`"
      :class="`${closeDisappear === false ? '' : 'animationDisappear'}`"
      @click="closeMenu"
      class="closeButton"
      size="20px"
      color="#606266"
      ><Fold
    /></el-icon>
    <el-icon
      :style="`display: ${isClose === false ? 'none' : 'inline'}`"
      :class="`${openDisappear === false ? '' : 'animationDisappear'}`"
      @click="openMenu"
      class="openButton"
      size="20px"
      color="#606266"
      ><Expand
    /></el-icon>
  </div>
</template>
  
<script>
import { ElMessage, ElMessageBox } from "element-plus";
export default {
  name: "MenuCom",
  props: {
    userName: {
      type: String,
      default: "",
      require: true,
    },
  },
  data() {
    return {
      isCollapse: false,
      closeDisappear: false,
      isClose: false,
      openDisappear: false,
      isMenu: true,
    };
  },
  mounted() {},
  methods: {
    // get the selected menu index
    getMenuIndex(val) {
      this.$emit("getMenuIndex", val);
    },
    // go to home page
    gotoHomePage() {
      this.$emit("changeToToday");
      this.isMenu = false;
      this.$nextTick(() => {
        this.isMenu = true;
      });
    },
    // log out
    logout() {
      // ask user wheter log out or not
      ElMessageBox.confirm("Confirm log out?", "Warning", {
        confirmButtonText: "Ok",
        cancelButtonText: "Cancel",
        type: "warning",
      }).then(() => {
        setTimeout(() => {
          this.$router.push({ name: "login" });
          ElMessage({
            type: "success",
            message: "Log out successfully",
          });
        }, 500);
      });
    },
    // close left menu
    closeMenu() {
      this.isCollapse = true;
      this.closeDisappear = true;
      this.openDisappear = false;
      setTimeout(() => {
        this.isClose = true;
      }, 300);
    },
    // open left menu
    openMenu() {
      this.isCollapse = false;
      this.closeDisappear = false;
      this.openDisappear = true;
      setTimeout(() => {
        this.isClose = false;
      }, 300);
    },
  },
};
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.menuCom {
  max-width: 200px;
  height: 100%;
  position: relative;
  .userInfo {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    width: 86%;
    height: 80px;
    border-bottom: 1px #dcdfe6 solid;
    font-size: 22px;
    text-align: center;
    z-index: 999;
    margin: 0 7%;
    .userIcon {
      padding: 6px;
      border: 1px solid;
      border-radius: 35px;
    }
  }
  .userInfoClose {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    width: 41px;
    height: 80px;
    margin: 0 10px;
    border-bottom: 1px #dcdfe6 solid;
    z-index: 999;
    .userIconClose {
      margin-top: 20px;
      padding: 4px;
      border: 1px solid;
      border-radius: 20px;
    }
  }
  .el-menu {
    padding-top: 100px;
    width: 200px;
    height: 100%;
  }
  .el-menu--collapse {
    width: calc(
      var(--el-menu-icon-width) + var(--el-menu-base-level-padding) * 2
        !important
    );
  }
  .el-icon {
    cursor: pointer;
  }
  .logoutbutton {
    position: absolute;
    left: 60px;
    bottom: 48px;
  }
  .closeButton {
    position: absolute;
    right: 16px;
    bottom: 0px;
  }
  .openButton {
    position: absolute;
    left: 24px;
    bottom: 0px;
  }
  .animationDisappear {
    animation-name: dispalyNone;
    animation-duration: 0.5s;
  }
  .animationUserDisappear {
    animation-name: dispalyNone;
    animation-duration: 0.1s;
    animation-fill-mode: forwards;
  }
  .animationAppear {
    animation-name: dispalyInline;
    animation-duration: 0.5s;
  }
}
@keyframes dispalyNone {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes dispalyInline {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
  