<template>
  <el-container>
    <div class="homePage">
      <MenuComp
        class="menuComp"
        :userName="userInfo.name"
        @changeToToday="changeToToday"
        @getMenuIndex="getMenuIndex"
      ></MenuComp>
      <TodayComp
        class="contentComp"
        :noteList="noteList"
        :todoList="todoList"
        @changeToCalendar="changeToCalendar"
        v-if="!isCalendar && menuIndex == ''"
      ></TodayComp>
      <CalendarComp
        class="contentComp"
        :noteList="noteList"
        :todoList="todoList"
        v-if="isCalendar && menuIndex == ''"
      ></CalendarComp>
      <NoteComp class="contentComp" v-if="menuIndex == 'note'"></NoteComp>
      <TodoComp class="contentComp" v-if="menuIndex == 'todo'"></TodoComp>
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
        name: "xxx",
      },
      noteList: [
        {
          name: "note1",
          content: "xxxxxxxxxxxxxx",
        },
        {
          name: "note22222222222",
          content: "xxxxxxxxxxxxxx",
        },
        {
          name: "note3",
          content: "xxxxxxxxxxxxxx",
        },
        {
          name: "note4",
        },
        {
          name: "note5",
        },
        {
          name: "note6",
        },
        {
          name: "note6",
        },
        {
          name: "note6",
        },
        {
          name: "note6",
        },
        {
          name: "note6",
        },

        {
          name: "note6",
        },
        {
          name: "note6",
        },
        {
          name: "note6",
        },
        {
          name: "note6",
        },
        {
          name: "note6",
        },
        {
          name: "note6",
        },

        {
          name: "note6",
        },
        {
          name: "note6",
        },
        {
          name: "note6",
        },
        {
          name: "note6",
        },
        {
          name: "note6",
        },
        {
          name: "note6",
        },

        {
          name: "note6",
        },
        {
          name: "note6",
        },
        {
          name: "note6",
        },
        {
          name: "note6",
        },
        {
          name: "note6",
        },
        {
          name: "note6",
        },
        {
          name: "note6",
        },
        {
          name: "note6",
        },
        {
          name: "note6",
        },
        {
          name: "note6",
        },
        {
          name: "note6",
        },
        {
          name: "note6",
        },
      ],
      todoList: [
        {
          name: "what need to do xxxx",
          status: false,
        },
        {
          name: "what need to do xxxx 2",
          status: true,
        },
        {
          name: "what need to do xxxx 3",
          status: false,
        },
        {
          name: "what need to do xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
          status: true,
        },
        {
          name: "what need to do xxxwwwwx 4",
          status: true,
        },
        {
          name: "what need to do xxxx 5",
          status: true,
        },
        {
          name: "what need to do xxxx 6",
          status: false,
        },
        {
          name: "what need to do xwwwwwwwwxxx 7",
          status: false,
        },
        {
          name: "what need to do xxxx 8",
          status: false,
        },
        {
          name: "what need to do xxwwwxx 9",
          status: false,
        },
        {
          name: "what need to do xxxx 10",
          status: false,
        },
        {
          name: "what need to do xxxx 11",
          status: true,
        },
        {
          name: "what need to do xxxx 12",
          status: false,
        },
      ],
      isCalendar: false,
      menuIndex: "",
    };
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
