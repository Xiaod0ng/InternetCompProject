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
          <div class="todoItem" v-for="(item, index) in todoList" :key="index">
            <el-checkbox v-model="item.status" :label="item.name" />
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
  
<script>
export default {
  name: "CalendarComp",
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
    return {
      todayDate: new Date(),
    };
  },
  mounted() {},
  watch: {
    todayDate(val) {
      this.getDate(val);
    },
  },
  methods: {
    // get the date chosen in calendar
    getDate(val) {
      console.log(val);
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
          overflow: hidden;
          margin: 5px 7px;
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

  