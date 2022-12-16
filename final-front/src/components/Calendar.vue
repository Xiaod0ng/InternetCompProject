<template>
  <div class="calendarCom">
    <el-calendar class="calendarCon" v-model="todayDate" @change="getDate()" />
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
            <span>{{ item.name }}</span>
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
    </div>
  </div>
</template>
  
<script>
import moment from "moment";
import { ElMessage } from "element-plus";
import http from "../http/http.js";
export default {
  name: "CalendarComp",
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
      todayDate: new Date(),
      todoList: {},
    };
  },
  mounted() {
    this.getSelectedDate(moment(this.todayDate).format("YYYY-MM-DD"));
  },
  watch: {
    todayDate(val) {
      this.getSelectedDate(moment(val).format("YYYY-MM-DD"));
    },
  },
  methods: {
    // get todo list by date
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
      height: 220px;
      padding-top: 10px;
      border-right: 1px #dcdfe6 solid;
      width: 64%;
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
      padding-left: 16px;
      height: 220px;
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

  