<template>
  <div class="todoCom">
    <div class="datePicker">
      <el-date-picker
        v-model="dateVal"
        type="date"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
        placeholder="Pick a day"
        size="large"
        :clearable="false"
        @change="getSelectedDate"
      />
      <div class="todoItemAdd" @click="addNewTodoList">
        <el-icon class="addTodoIcon" size="25px"><Plus /></el-icon>
      </div>
    </div>
    <el-scrollbar class="todoListScroll">
      <div class="todoList">
        <div class="todoItem" v-for="(item, index) in todoList" :key="item.id">
          <el-popover placement="right" trigger="hover">
            <template #reference>
              <el-checkbox
                v-model="item.status"
                :label="item.content"
                :true-label="1"
                :false-label="0"
                @change="changeTodoStatus(item.status, index)"
              />
            </template>
            <el-icon size="20px" class="editIcon" @click="editTodoItem(index)"
              ><Edit
            /></el-icon>
            <el-icon
              size="20px"
              class="deleteIcon"
              @click="deleteTodoItem(item.id)"
              ><Delete
            /></el-icon>
          </el-popover>
        </div>
      </div>
      <div class="todoEmpty" v-if="todoList.length == 0">No Todo Task</div>
    </el-scrollbar>
    <el-dialog
      v-model="addDialogVisible"
      :title="editIndex == -1 ? 'Add New Todo Task' : 'Edit Todo Task'"
      width="30%"
      :before-close="handleClose"
    >
      <el-input
        v-model="inputTodoItem"
        maxlength="200"
        placeholder="Please input"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">Cancel</el-button>
          <el-button type="primary" @click="saveNewTodoItem"> Save </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
  
<script>
import moment from "moment";
import { ElMessage, ElMessageBox } from "element-plus";
import http from "../http/http.js";
export default {
  name: "TodoCom",
  props: {
    userId: {
      type: String,
      default: "",
      require: true,
    },
  },
  data() {
    return {
      dateVal: moment(new Date()).format("YYYY-MM-DD"),
      todoList: [],
      addDialogVisible: false,
      editIndex: -1,
      inputTodoItem: "",
    };
  },
  mounted() {
    this.getSelectedDate(this.dateVal);
  },
  watch: {},
  methods: {
    // get todo list on selected date
    async getSelectedDate(val) {
      // console.log("selected date:" + val);
      await http
        .post("/getTodoList", { date: val, userId: parseInt(this.userId) })
        .then((res) => {
          if (res.code === 0) {
            if (res.data.msg == "Get todoList successfully") {
              this.todoList = res.data.todoList;
            } else {
              ElMessage({
                message: "fail to get todo list.",
                type: "error",
              });
            }
          }
        });
    },
    // show add todo item dialog
    addNewTodoList() {
      this.editIndex = -1;
      this.addDialogVisible = true;
    },
    // save new todo item to database
    saveNewTodoItem() {
      if (this.editIndex == -1) {
        let obj = {
          date: this.dateVal,
          content: this.inputTodoItem,
          userId: parseInt(this.userId),
          status: 0,
        };
        http.post("/todoAdd", obj).then((res) => {
          if (res.code === 0) {
            if (res.data.msg == "Add success") {
              ElMessage({
                message: "Add todo task successfully.",
                type: "success",
              });
              this.getSelectedDate(this.dateVal);
            } else {
              ElMessage({
                message: "fail to add new todo task.",
                type: "error",
              });
            }
          }
        });
        this.inputTodoItem = "";
        this.addDialogVisible = false;
      } else {
        let editObj = {
          content: this.inputTodoItem,
          status: parseInt(this.todoList[this.editIndex].status),
          id: parseInt(this.todoList[this.editIndex].id),
        };
        http.post("/todoEdit", editObj).then((res) => {
          if (res.code === 0) {
            if (res.data.msg == "Edit success") {
              ElMessage({
                message: "Edit todo task successfully.",
                type: "success",
              });
              this.getSelectedDate(this.dateVal);
            } else {
              ElMessage({
                message: "fail to add new todo task.",
                type: "error",
              });
            }
          }
        });
        this.inputTodoItem = "";
        this.addDialogVisible = false;
      }
    },
    // clear previous input before close add todo item dialog
    handleClose() {
      this.inputTodoItem = "";
      this.addDialogVisible = false;
    },
    // save the changes of Todo List status
    changeTodoStatus(status, index) {
      let editObj = {
        content: this.todoList[index].content,
        status: parseInt(status),
        id: parseInt(this.todoList[index].id),
      };
      http.post("/todoEdit", editObj).then((res) => {
        if (res.code === 0) {
          if (res.data.msg == "Edit success") {
            this.getSelectedDate(this.dateVal);
          } else {
            ElMessage({
              message: "fail to change Todo Item status.",
              type: "error",
            });
          }
        }
      });
    },
    // edit todo item
    editTodoItem(index) {
      this.inputTodoItem = this.todoList[index].content;
      this.editIndex = index;
      this.addDialogVisible = true;
    },
    // delete todo item
    deleteTodoItem(id) {
      ElMessageBox.confirm("Confirm delete selected todo task?", "Warning", {
        confirmButtonText: "Ok",
        cancelButtonText: "Cancel",
        type: "warning",
      }).then(() => {
        http.post("/todoDelete", { id: parseInt(id) }).then((res) => {
          if (res.code === 0) {
            if (res.data.msg == "Delete success") {
              ElMessage({
                message: "Delete successfully.",
                type: "success",
              });
              this.getSelectedDate(this.dateVal);
            } else {
              ElMessage({
                message: "fail to delete todo task.",
                type: "error",
              });
            }
          }
        });
      });
    },
  },
};
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.todoCom {
  width: 100%;
  height: 100%;
  position: relative;
  .datePicker {
    text-align: left;
    padding: 16px 0 0 16px;
    display: flex;
    flex-direction: row;
    .todoItemAdd {
      overflow: hidden;
      margin: 4px 16px;
      cursor: pointer;
      .addTodoIcon {
        border: 3px #c0c4cc solid;
      }
    }
  }
  .todoListScroll {
    padding-top: 8px;
    height: calc(100% - 72px);
    .todoList {
      display: block;
      text-align: left;
      width: 800px;
      .todoItem {
        margin: 5px 16px;
        .is-checked {
          text-decoration: line-through;
        }
      }
    }
    .todoEmpty {
      padding-top: 62px;
      color: #909399;
    }
  }
}
</style>
<style lang="scss">
.editIcon {
  cursor: pointer;
}
.deleteIcon {
  cursor: pointer;
  margin-left: 8px;
}
.el-popover.el-popper {
  width: 80px !important;
  min-width: 50px !important;
  text-align: center;
}
</style>


  