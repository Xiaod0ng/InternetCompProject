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
        <el-icon class="addNoteIcon" size="25px"><Plus /></el-icon>
      </div>
    </div>
    <el-scrollbar class="todoListScroll">
      <div class="todoList">
        <div class="todoItem" v-for="(item, index) in todoList" :key="index">
          <el-popover placement="right" trigger="hover">
            <template #reference>
              <el-checkbox
                v-model="item.status"
                :label="item.name"
                @change="changeTodoStatus(item.status, index)"
              />
            </template>
            <el-icon size="20px" class="editIcon" @click="editTodoItem(index)"
              ><Edit
            /></el-icon>
            <el-icon
              size="20px"
              class="deleteIcon"
              @click="deleteTodoItem(index)"
              ><Delete
            /></el-icon>
          </el-popover>
        </div>
      </div>
    </el-scrollbar>
    <el-dialog
      v-model="addDialogVisible"
      :title="editIndex == -1 ? 'Add New Todo Item' : 'Edit Todo Item'"
      width="30%"
      :before-close="handleClose"
    >
      <el-input v-model="inputTodoItem" placeholder="Please input" />
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
export default {
  name: "NoteCom",
  props: {},
  data() {
    return {
      dateVal: moment(new Date()).format("YYYY-MM-DD"),
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
      ],
      addDialogVisible: false,
      editIndex: -1,
      inputTodoItem: "",
    };
  },
  mounted() {},
  watch: {},
  methods: {
    // get selected date
    getSelectedDate(val) {
      console.log("selected date:" + val);
    },
    // show add todo item dialog
    addNewTodoList() {
      this.editIndex = -1;
      this.addDialogVisible = true;
    },
    // save new todo item to database
    saveNewTodoItem() {
      console.log(this.dateVal, this.inputTodoItem, this.editIndex);
      if (this.editIndex == -1) {
        this.todoList.push({
          name: this.inputTodoItem,
          status: false,
        });
        this.inputTodoItem = "";
        this.addDialogVisible = false;
      } else {
        this.todoList[this.editIndex].name = this.inputTodoItem;
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
      console.log(status, index);
    },
    // edit todo item
    editTodoItem(index) {
      this.inputTodoItem = this.todoList[index].name;
      this.editIndex = index;
      this.addDialogVisible = true;
    },
    // delete todo item
    deleteTodoItem(index) {
      ElMessageBox.confirm("Confirm delete selected todo item?", "Warning", {
        confirmButtonText: "Ok",
        cancelButtonText: "Cancel",
        type: "warning",
      }).then(() => {
        this.todoList.splice(index, 1);
        ElMessage({
          type: "success",
          message: "Delete successfully",
        });
      }, 500);
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
      .addNoteIcon {
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
        overflow: hidden;
        margin: 5px 16px;
      }
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


  