<template>
  <div class="todayNoteCom">
    <div v-if="!isNote">
      <div class="headerBar">
        <el-icon class="starIcon" size="35px" color="#E6A23C"
          ><StarFilled
        /></el-icon>
        <span>TODAY</span>
        <el-icon class="calendarIcon" size="28px" @click="changeTodayFormat"
          ><Calendar
        /></el-icon>
      </div>
      <el-scrollbar class="todayNoteScroll">
        <div class="todayNote">
          <div
            class="noteItem"
            v-for="(item, index) in noteList"
            :key="index"
            @click="openNoteDetail(index)"
          >
            <el-icon size="60px" class="noteIcon"><Document /></el-icon>
            <span>{{ item.title }}</span>
          </div>
        </div>
      </el-scrollbar>
      <el-scrollbar class="todoListScroll">
        <div class="todoList">
          <div
            class="todoItem"
            v-for="(item, index) in todoList"
            :key="item.id"
          >
            <el-checkbox
              v-model="item.status"
              :label="item.content"
              :true-label="1"
              :false-label="0"
              @change="changeTodoStatus(item.status, index)"
            />
          </div>
        </div>
      </el-scrollbar>
      <div
        style="color: #909399"
        v-if="noteList.length == 0 && todoList.length == 0"
      >
        You did not add any note or todo task today.
      </div>
    </div>
    <NoteComp
      class="contentComp"
      :userId="userId"
      :isHomeNote="isNote"
      :todayDate="todayDate"
      :noteIndex="noteIndex"
      @closeNoteDetail="closeNoteDetail"
      v-if="isNote"
    ></NoteComp>
  </div>
</template>
  
<script>
import moment from "moment";
import { ElMessage } from "element-plus";
import http from "../http/http.js";
import NoteComp from "../components/Note.vue";
export default {
  name: "TodayComp",
  components: {
    NoteComp,
  },
  props: {
    userId: {
      type: String,
      default: "",
      require: true,
    },
  },
  data() {
    return {
      todayDate: moment(new Date()).format("YYYY-MM-DD"),
      noteList: {},
      todoList: {},
      noteIndex: "",
      isNote: false,
    };
  },
  mounted() {
    this.getSelectedDateNote(this.todayDate);
    this.getSelectedDateTodo(this.todayDate);
  },
  methods: {
    // get today's note
    async getSelectedDateNote(val) {
      await http
        .post("/getNote", { date: val, userId: parseInt(this.userId) })
        .then((res) => {
          if (res.code === 0) {
            if (res.data.msg == "Get note successfully") {
              this.noteList = res.data.noteList;
            } else {
              ElMessage({
                message: "fail to get note list.",
                type: "error",
              });
            }
          }
        });
    },
    // get today's todo list
    async getSelectedDateTodo(val) {
      await http
        .post("/getTodoList", {
          date: val,
          userId: parseInt(this.userId),
        })
        .then((res) => {
          if (res.code === 0) {
            if (res.data.msg == "Get todoList successfully") {
              this.todoList = res.data.todoList;
            } else {
              ElMessage({
                message: "fail to get Todo List.",
                type: "error",
              });
            }
          }
        });
    },
    // change right home page to the format with calendar
    changeTodayFormat() {
      this.$emit("changeToCalendar");
    },
    // open note detail with its index
    openNoteDetail(index) {
      this.isNote = true;
      this.noteIndex = index;
    },
    // back to home page from note detail
    closeNoteDetail() {
      this.getSelectedDateNote(this.todayDate);
      this.isNote = false;
    },
    // change Todo List status
    changeTodoStatus(status, index) {
      let editObj = {
        content: this.todoList[index].content,
        status: parseInt(status),
        id: parseInt(this.todoList[index].id),
      };
      http.post("/todoEdit", editObj).then((res) => {
        if (res.code === 0) {
          if (res.data.msg == "Edit success") {
            this.getSelectedDateTodo(this.todayDate);
          } else {
            ElMessage({
              message: "fail to change Todo Item status.",
              type: "error",
            });
          }
        }
      });
    },
  },
};
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.todayNoteCom {
  width: 100%;
  height: 100%;
  position: relative;
  .headerBar {
    display: block;
    width: 100%;
    height: 40px;
    .starIcon {
      float: left;
    }
    span {
      margin-left: 8px;
      line-height: 40px;
      font-size: 24px;
      font-weight: 500;
      float: left;
    }
    .calendarIcon {
      line-height: 35px;
      float: right;
      cursor: pointer;
    }
    .calendarIcon:hover {
      color: #409eff;
    }
  }

  .todayNoteScroll {
    padding-top: 20px;
    height: calc(50% - 40px);
    border-bottom: 1px #dcdfe6 solid;
    .todayNote {
      display: flex;
      flex-wrap: wrap;
      overflow-x: hidden;
      .noteItem {
        width: 80px;
        height: 90px;
        display: flex;
        flex-direction: column;
        text-align: center;
        margin: 11px 8px;
        overflow: hidden;
        cursor: pointer;
        .noteIcon {
          margin-left: 8px;
        }
        span {
          margin-top: 4px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
  .todoListScroll {
    padding-top: 20px;
    height: calc(50% - 40px);
    .todoList {
      display: block;
      text-align: left;
      max-width: 780px;
      .todoItem {
        overflow: hidden;
        margin: 5px 7px;
        .is-checked {
          text-decoration: line-through;
        }
      }
    }
  }
}
</style>
<style >
.el-checkbox__label {
  font-size: 16px !important;
  color: #303133;
}
</style>
  