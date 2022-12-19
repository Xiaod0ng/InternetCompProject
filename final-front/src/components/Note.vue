<template>
  <div class="noteCom">
    <div
      class="noteList"
      v-if="!isNoteDetail && (!isHomeNote || !isCalendarNote)"
    >
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
      </div>
      <el-scrollbar class="noteScroll">
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
          <div class="noteEmpty" v-if="noteList.length == 0">No Note</div>
        </div>
      </el-scrollbar>
    </div>
    <div class="newNote" v-if="isNoteDetail">
      <el-page-header :icon="null" @back="onBack">
        <template #title>
          <el-icon style="margin-top: 8px"><ArrowLeftBold /></el-icon>
        </template>
        <template #content>
          <div class="flex items-center">
            <span
              style="font-size: 22px"
              v-if="!isEdit && currentNote.title !== ''"
            >
              {{ currentNote.title }}
            </span>
            <div class="editTitle" v-if="isEdit || currentNote.title == ''">
              <el-input
                style="font-size: 20px"
                maxlength="32"
                v-model="currentNote.title"
              />
            </div>
          </div>
        </template>
        <template #extra>
          <div class="buttonGroup">
            <el-button type="primary" @click="changeEditStatus">{{
              isEdit ? "Save" : "Edit"
            }}</el-button>
            <el-button
              type="default"
              v-if="isEdit && currentIndex !== -1"
              @click="cancelEdit"
              >Cancel</el-button
            >
            <el-button
              type="default"
              v-if="!isEdit && currentIndex !== -1"
              @click="deleteNote"
              >Delete</el-button
            >
          </div>
        </template>
      </el-page-header>
      <div class="noteArea">
        <el-input
          v-model="currentNote.content"
          :rows="24"
          maxlength="1872"
          type="textarea"
          :disabled="!isEdit"
        />
      </div>
    </div>
  </div>
</template>
  
<script>
import moment from "moment";
import { ElMessage, ElMessageBox } from "element-plus";
import http from "../http/http.js";
export default {
  name: "NoteCom",
  props: {
    userId: {
      type: String,
      default: "",
      require: true,
    },
    isHomeNote: {
      type: Boolean,
      default: false,
    },
    isCalendarNote: {
      type: Boolean,
      default: false,
    },
    todayDate: {
      type: String,
      default: "",
    },
    calendarDate: {
      type: Date,
      default: new Date(),
    },
    noteIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      dateVal: moment(new Date()).format("YYYY-MM-DD"),
      noteList: [],
      isNoteDetail: false,
      isEdit: false,
      currentNote: {
        title: "",
        content: "",
      },
      currentIndex: -1,
    };
  },
  async mounted() {
    if (this.isHomeNote) {
      await this.getSelectedDate(this.todayDate);
      this.currentIndex = this.noteIndex;
      this.currentNote = { ...this.noteList[this.currentIndex] };
      this.isNoteDetail = true;
    } else if (this.isCalendarNote) {
      await this.getSelectedDate(
        moment(this.calendarDate).format("YYYY-MM-DD")
      );
      this.currentIndex = this.noteIndex;
      this.currentNote = { ...this.noteList[this.currentIndex] };
      this.isNoteDetail = true;
    } else {
      this.getSelectedDate(this.dateVal);
    }
  },
  watch: {},
  methods: {
    // get selected date
    async getSelectedDate(val) {
      // console.log("selected date:" + val);
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
      this.currentIndex = index;
      this.currentNote = { ...this.noteList[index] };
      this.isNoteDetail = true;
      console.log(this.isCalendarNote, this.isHomeNote, this.isNoteDetail);
    },
    // create a new note
    createNewNote() {
      this.isNoteDetail = true;
      this.isEdit = true;
      this.currentNote = {
        title: "",
        content: "",
      };
      this.currentIndex = -1;
    },
    // back to note list page
    onBack() {
      if (this.isHomeNote) {
        this.$emit("closeNoteDetail");
      }
      if (this.isCalendarNote) {
        this.$emit("closeCalendarNoteDetail");
      }
      this.currentIndex = -1;
      this.currentNote = {
        title: "",
        content: "",
      };
      this.isNoteDetail = false;
      this.isEdit = false;
    },
    // text area to edit or save
    changeEditStatus() {
      if (this.isEdit) {
        if (this.currentIndex == -1) {
          if (this.currentNote.title == "") {
            ElMessage({
              message: "Please input note title.",
              type: "warning",
            });
          } else {
            let obj = {
              ...this.currentNote,
              date: this.dateVal,
              userId: parseInt(this.userId),
            };
            http.post("/noteAdd", obj).then(async (res) => {
              if (res.code === 0) {
                if (res.data.msg == "Add note successfully") {
                  ElMessage({
                    message: "Add note successful.",
                    type: "success",
                  });
                  await this.getSelectedDate(this.dateVal);
                  this.currentIndex = this.noteList.length - 1;
                  this.currentNote = { ...this.noteList[this.currentIndex] };
                  this.isEdit = !this.isEdit;
                } else {
                  ElMessage({
                    message: "fail to add new note.",
                    type: "error",
                  });
                }
              }
            });
          }
        } else {
          let obj = {
            ...this.currentNote,
            userId: parseInt(this.userId),
          };
          http.post("/noteEdit", obj).then(async (res) => {
            if (res.code === 0) {
              if (res.data.msg == "Edit note successfully") {
                ElMessage({
                  message: "Edit selected note successfully.",
                  type: "success",
                });
                await this.getSelectedDate(this.dateVal);
                this.currentNote = { ...this.noteList[this.currentIndex] };
                this.isEdit = !this.isEdit;
              } else {
                ElMessage({
                  message: "fail to edit selected note.",
                  type: "error",
                });
              }
            }
          });
        }
      } else {
        this.isEdit = !this.isEdit;
      }
    },
    // cancel text area edit
    cancelEdit() {
      this.isEdit = !this.isEdit;
    },
    // delete note
    deleteNote() {
      ElMessageBox.confirm("Confirm delete selected note?", "Warning", {
        confirmButtonText: "Ok",
        cancelButtonText: "Cancel",
        type: "warning",
      }).then(async () => {
        await http
          .post("/noteDelete", {
            id: parseInt(this.noteList[this.currentIndex].id),
          })
          .then((res) => {
            if (res.code === 0) {
              if (res.data.msg == "Delete note successfully") {
                ElMessage({
                  message: "Delete note successfully.",
                  type: "success",
                });
                this.getSelectedDate(this.dateVal);
                setTimeout(() => {
                  this.onBack();
                }, 1000);
              } else {
                ElMessage({
                  message: "fail to delete note.",
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
.noteCom {
  width: 100%;
  height: 100%;
  position: relative;
  .noteList {
    .datePicker {
      text-align: left;
      padding: 16px 0 0 16px;
      display: flex;
      flex-direction: row;
      .noteItemAdd {
        overflow: hidden;
        margin: 4px 16px;
        cursor: pointer;
        .addNoteIcon {
          border: 3px #c0c4cc solid;
        }
      }
    }
    .noteScroll {
      padding-top: 20px;
      height: calc(100% - 85px);
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
    .noteEmpty {
      padding-top: 50px;
      color: #909399;
    }
  }
  .newNote {
    .editTitle {
      display: flex;
      flex-direction: row;
    }
    .noteArea {
      margin-top: 12px;
      .el-textarea {
        font-size: 20px !important;
      }
    }
  }
}
</style>

  