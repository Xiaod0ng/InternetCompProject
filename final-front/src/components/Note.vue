<template>
  <div class="noteCom">
    <div class="noteList" v-if="!isAddNote">
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
      <el-scrollbar class="todayNoteScroll">
        <div class="todayNote">
          <div class="noteItemAdd" @click="createNewNote()">
            <el-icon class="addNoteIcon" size="30px"><Plus /></el-icon>
          </div>
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
    </div>
    <div class="newNote" v-if="isAddNote">
      <el-page-header :icon="null" @back="onBack">
        <template #title>
          <el-icon style="margin-top: 8px"><ArrowLeftBold /></el-icon>
        </template>
        <template #content>
          <div class="flex items-center">
            <el-popover
              placement="right"
              trigger="hover"
              v-if="!isTitleEdit && currentNote.name !== ''"
            >
              <template #reference>
                <span class="text-large font-600 mr-3">
                  {{ currentNote.name }}
                </span>
              </template>
              <el-icon size="20px" class="editIcon" @click="editNoteTitle"
                ><Edit
              /></el-icon>
            </el-popover>
            <div class="editTitle" v-if="isTitleEdit || currentNote.name == ''">
              <el-input v-model="noteTitle" />
              <el-icon
                size="20px"
                class="editIcon"
                @click="saveNoteTitle()"
                style="margin: 6px"
                ><CircleCheck
              /></el-icon>
              <el-icon
                size="20px"
                class="editIcon"
                @click="cancelNoteTitle()"
                style="margin: 6px 0"
                ><CircleClose
              /></el-icon>
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
          </div>
        </template>
      </el-page-header>
      <div class="noteArea">
        <el-input
          v-model="noteArea"
          :rows="26"
          type="textarea"
          :disabled="!isEdit"
        />
      </div>
    </div>
  </div>
</template>
  
<script>
import moment from "moment";
import { ElMessage } from "element-plus";
export default {
  name: "NoteCom",
  props: {},
  data() {
    return {
      dateVal: moment(new Date()).format("YYYY-MM-DD"),
      noteList: [
        {
          name: "note1",
          content: "xxxxxxxxxxxxxxxxxx",
        },
        {
          name: "note22222222222",
          content: "xxxxxxxxxxxxxxxxxx",
        },
        {
          name: "note3",
          content: "xxxxxxxxxxxxxxxxxx",
        },
        {
          name: "note1",
        },
        {
          name: "note1",
        },
        {
          name: "note22222222222",
        },
        {
          name: "note3",
        },
        {
          name: "note1",
        },
        {
          name: "note1",
        },
        {
          name: "note22222222222",
        },
        {
          name: "note3",
        },
        {
          name: "note1",
        },
      ],
      isAddNote: false,
      isEdit: false,
      isTitleEdit: false,
      currentNote: {
        name: "",
        content: "",
      },
      currentIndex: -1,
      noteArea: "",
      noteTitle: "",
    };
  },
  mounted() {},
  watch: {},
  methods: {
    // get selected date
    getSelectedDate(val) {
      console.log("selected date:" + val);
      this.noteList = [
        {
          name: "note1",
        },
        {
          name: "note22222222222",
        },
        {
          name: "note3",
        },
      ];
    },
    // open note detail with its index
    openNoteDetail(index) {
      console.log(
        "open No." +
          (index + 1) +
          " note, its name is " +
          this.noteList[index].name
      );
      this.currentIndex = index;
      this.currentNote = { ...this.noteList[index] };
      this.noteArea = this.currentNote.content;
      this.isAddNote = true;
    },
    // create a new note
    createNewNote() {
      this.isAddNote = true;
      this.isEdit = true;
      this.isTitleEdit = true;
      this.currentNote = {
        name: "",
        content: "",
      };
      this.currentIndex = -1;
      this.noteArea = "";
    },
    // back to note list page
    onBack() {
      this.currentIndex = -1;
      this.currentNote = {
        name: "",
        content: "",
      };
      this.noteArea = "";
      this.noteTitle = "";
      this.isAddNote = false;
      this.isEdit = false;
      this.isTitleEdit = false;
    },
    // text area to edit or save
    changeEditStatus() {
      if (this.isEdit) {
        if (this.currentIndex == -1) {
          if (this.noteArea == "") {
            ElMessage({
              message: "Please input note content first",
              type: "error",
            });
          } else {
            console.log("add a new note content");
            this.currentIndex = this.noteList.size;
            this.currentNote = {
              name: "Untitled",
              content: this.noteArea,
            };
            this.noteList.push(this.currentNote);
            this.isEdit = !this.isEdit;
            this.isTitleEdit = false;
          }
        } else {
          this.currentNote.content = this.noteArea;
          this.noteList[this.currentIndex] = { ...this.currentNote };
          this.isEdit = !this.isEdit;
        }
        console.log("save edit:", this.noteList);
      } else {
        this.isEdit = !this.isEdit;
      }
    },
    // cancel text area edit
    cancelEdit() {
      if (this.currentIndex == -1) {
        ElMessage({
          message: "Please input note content first",
          type: "error",
        });
      } else {
        this.noteArea = this.currentNote.content;
        this.isEdit = !this.isEdit;
        console.log("cancel edit");
      }
    },
    // edit note title
    editNoteTitle() {
      this.isTitleEdit = true;
      this.noteTitle = this.currentNote.name;
    },
    // save note title edit
    saveNoteTitle() {
      this.currentNote.name = this.noteTitle;
      if (this.currentIndex == -1) {
        if (this.noteTitle == "") {
          ElMessage({
            message: "Please input note title first",
            type: "error",
          });
        } else {
          console.log("add a new note title ");
          this.currentIndex = this.noteList.size;
          this.noteList.push(this.currentNote);
        }
      } else {
        this.noteList[this.currentIndex] = { ...this.currentNote };
      }
      this.isTitleEdit = false;
    },
    // cancel note title edit
    cancelNoteTitle() {
      if (this.currentIndex == -1) {
        ElMessage({
          message: "Please input note title first",
          type: "error",
        });
      }
      this.isTitleEdit = false;
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
    }
    .todayNoteScroll {
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
        .noteItemAdd {
          width: 80px;
          height: 90px;
          display: flex;
          justify-content: center;
          margin: 11px 8px;
          overflow: hidden;
          cursor: pointer;
          .addNoteIcon {
            margin-top: 16px;
            border: 3px #c0c4cc solid;
          }
        }
      }
    }
  }
  .newNote {
    .editTitle {
      display: flex;
      flex-direction: row;
    }
    .noteArea {
      margin-top: 20px;
    }
  }
}
</style>
<style>
.el-textarea__inner {
  font-size: 18px !important;
}
</style>

  