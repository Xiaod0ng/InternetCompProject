<template>
  <div class="calendarCom">
    <div v-if="!isNote">
      <el-calendar
        class="calendarCon"
        v-model="todayDate"
        @change="getDate()"
      />
      <div class="dateInfo">
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
          <div style="color: #909399" v-if="noteList.length == 0">No Note</div>
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
          <div class="todoEmpty" v-if="todoList.length == 0">No Todo Task</div>
        </el-scrollbar>
      </div>
    </div>
    <NoteComp
      class="contentComp"
      :userId="userId"
      :isCalendarNote="isNote"
      :calendarDate="todayDate"
      :noteIndex="noteIndex"
      @closeCalendarNoteDetail="closeCalendarNoteDetail"
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
  name: "CalendarComp",
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
      todayDate: new Date(),
      noteList: {},
      todoList: {},
      noteIndex: "",
      isNote: false,
    };
  },
  mounted() {
    this.getSelectedDateNote(moment(this.todayDate).format("YYYY-MM-DD"));
    this.getSelectedDateTodo(moment(this.todayDate).format("YYYY-MM-DD"));
  },
  watch: {
    todayDate(val) {
      this.getSelectedDateNote(moment(val).format("YYYY-MM-DD"));
      this.getSelectedDateTodo(moment(val).format("YYYY-MM-DD"));
    },
  },
  methods: {
    // get note list by date
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
    // open note detail with its index
    openNoteDetail(index) {
      this.isNote = true;
      this.noteIndex = index;
    },
    // back to home page from note detail
    closeCalendarNoteDetail() {
      this.getSelectedDateNote(moment(this.todayDate).format("YYYY-MM-DD"));
      this.isNote = false;
    },
    // get todo list by date
    getSelectedDateTodo(val) {
      http
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
    changeTodoStatus(status, index) {
      let editObj = {
        content: this.todoList[index].content,
        status: parseInt(status),
        id: parseInt(this.todoList[index].id),
      };
      http.post("/todoEdit", editObj).then((res) => {
        if (res.code === 0) {
          if (res.data.msg == "Edit success") {
            this.getSelectedDate(moment(this.todayDate).format("YYYY-MM-DD"));
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
.calendarCom {
  width: 100%;
  height: 100%;
  position: relative;
  .calendarCon {
    border-bottom: 1px #dcdfe6 solid;
  }
  .dateInfo {
    display: flex;
    flex-direction: row;
    .todayNoteScroll {
      height: 208px;
      margin: 12px 0;
      border-right: 1px #dcdfe6 solid;
      width: 64%;
      .todayNote {
        display: flex;
        flex-wrap: wrap;
        overflow-x: hidden;
        .noteItem {
          width: 80px;
          height: 85px;
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
      width: 36%;
      padding: 6px 16px 0 0;
      height: 214px;
      .todoList {
        display: block;
        text-align: left;
        max-width: 780px;
        .todoItem {
          margin: 5px 7px;
          .is-checked {
            text-decoration: line-through;
          }
        }
      }
      .todoEmpty {
        padding-top: 10px;
        margin: auto;
        color: #909399;
      }
    }
  }
}
</style>
<style >
.el-calendar__body {
  padding: 12px 20px 16px;
}
.el-checkbox__label {
  font-size: 16px !important;
  color: #303133;
}
.el-calendar-table {
  height: 475px;
}
.el-calendar-day {
  height: 70px !important;
}
</style>

  