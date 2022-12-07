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
        <div class="todoItem" v-for="(item, index) in todoList" :key="index">
          <el-checkbox v-model="item.status" :label="item.name" />
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
  
<script>
export default {
  name: "TodayComp",
  props: {
    noteList: {
      type: Array,
      default: () => [],
    },
    todoList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
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
  