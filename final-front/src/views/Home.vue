<template>
  <el-container>
    <div class="homePage">
      <MenuComp
        class="menuComp"
        :userName="userInfo.userName"
        @changeToToday="changeToToday"
        @getMenuIndex="getMenuIndex"
      ></MenuComp>
      <TodayComp
        class="contentComp"
        :userId="userInfo.userId"
        @changeToCalendar="changeToCalendar"
        v-if="!isCalendar && menuIndex == '' && userInfo.userId"
      ></TodayComp>
      <CalendarComp
        class="contentComp"
        :userId="userInfo.userId"
        v-if="isCalendar && menuIndex == ''"
      ></CalendarComp>
      <NoteComp
        class="contentComp"
        :userId="userInfo.userId"
        v-if="menuIndex == 'note'"
      ></NoteComp>
      <TodoComp
        :userId="userInfo.userId"
        class="contentComp"
        v-if="menuIndex == 'todo'"
      ></TodoComp>
    </div>
  </el-container>
</template>

<script>
import MenuComp from "../components/Menu.vue";
import TodayComp from "../components/Today.vue";
import CalendarComp from "../components/Calendar.vue";
import NoteComp from "../components/Note.vue";
import TodoComp from "../components/Todo.vue";
export default {
  name: "HomePage",
  components: {
    MenuComp,
    TodayComp,
    CalendarComp,
    NoteComp,
    TodoComp,
  },
  data() {
    return {
      userInfo: {
        userName: "",
        userId: "",
      },
      isCalendar: false,
      menuIndex: "",
    };
  },
  mounted() {
    this.userInfo = { ...this.$route.query };
  },
  methods: {
    // get the selected menu index
    getMenuIndex(val) {
      this.menuIndex = val;
    },
    // change to today home format
    changeToToday() {
      this.isCalendar = false;
      this.menuIndex = "";
    },
    // change to calendar home format
    changeToCalendar() {
      this.isCalendar = true;
      this.menuIndex = "";
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
  padding-top: 40px;
  align-items: center;
  justify-content: center;
  .homePage {
    width: 1024px;
    height: 768px;
    padding: 16px 16px 16px 0;
    border: 1.5px solid;
    border-color: #a8abb2;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    .menuComp {
      height: 100%;
    }
    .contentComp {
      width: 100%;
      margin-left: 16px;
    }
  }
}
</style>
