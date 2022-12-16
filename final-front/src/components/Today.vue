<template>
  <div class="todayNoteCom">
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
          <span>{{ item.name }}</span>
        </div>
      </div>
    </el-scrollbar>
    <el-scrollbar class="todoListScroll">
      <div class="todoList">
        <div class="todoItem" v-for="(item, index) in todoList" :key="item.id">
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
  </div>
</template>
  
<script>
import moment from "moment";
import { ElMessage } from "element-plus";
import http from "../http/http.js";
export default {
  name: "TodayComp",
  props: {
    noteList: {
      type: Array,
      default: () => [],
    },
    userId: {
      type: String,
      default: "",
      require: true,
    },
  },
  data() {
    return {
      todayDate: moment(new Date()).format("YYYY-MM-DD"),
      todoList: {},
    };
  },
  mounted() {
    this.getSelectedDate(this.todayDate);
  },
  methods: {
    // get today's todo list
    getSelectedDate(val) {
      http
        .post("/getTodoList", {
          date: val,
          userId: parseInt(this.userId),
        })
        .then((res) => {
          if (res.code === 0) {
            if (res.data.msg == "Get todoList successful") {
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
      console.log(
        "open No." +
          (index + 1) +
          " note, its name is " +
          this.noteList[index].name
      );
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
            this.getSelectedDate(this.todayDate);
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
  