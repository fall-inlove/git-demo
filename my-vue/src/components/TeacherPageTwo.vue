<template>
  <div class="contarn">
    <div class="message">
      <span
        >学期:<el-tag>{{ date }}</el-tag></span
      >
      <span
        >班级:<el-tag>{{ classes }}</el-tag></span
      >
      <span
        >小组最大人数:
        <el-tag v-if="!isShow">{{ maxNumber }}人</el-tag>
        <input
          v-else
          type="number"
          class="input"
          ref="inputNumber"
          v-model.number="inputs"
          @keydown.enter="changeMax"
          @blur="changeMax"
        />
      </span>
      <el-button
        class="button"
        @click="change"
        v-show="!isShow"
        icon="el-icon-edit"
      >
        编辑
      </el-button>
    </div>
    <el-table :data="tableData" style="width: 97%" class="contain">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="课题内容:">
              <span>{{ props.row.content }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="index" label="编号" width="100"></el-table-column>
      <el-table-column label="题目名" prop="name"> </el-table-column>
      <el-table-column width="400" align="center">
        <template slot="header">
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="dialogVisible = true"
            >添加课题</el-button
          >
        </template>
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template></el-table-column
      ></el-table
    >
    <el-dialog title="编辑课题" :visible.sync="dialogVisible" width="50%">
      课题名称:<el-input v-model="topic.name" placeholder="请输入课题标题" />
      课题内容:<el-input
        type="textarea"
        :rows="10"
        placeholder="请输入课题内容"
        v-model="topic.content"
      >
      </el-input>
      <div class="dialog-bottom">
        <el-button type="warning" @click="clearContent">清除内容</el-button>
        <el-button type="primary">确认修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "TeacherPageTwo",
  data() {
    return {
      date: "",
      classes: "192015",
      dialogVisible: false,
      inputs: "",
      isShow: false,
      maxNumber: 5,
      topic: {
        id: "",
        name: "",
        content: "",
      },
      tableData: [
        {
          id: "1",
          name: "课设管理系统",
          content: "王小虎是一只猫",
        },
        {
          id: "2",
          name: "医院排队叫号系统",
          content: "王小虎是一只猫",
        },
      ],
    };
  },
  methods: {
    change() {
      this.isShow = true;
      this.inputs = this.maxNumber;
      this.$nextTick(function () {
        this.$refs.inputNumber.focus();
      });
    },
    changeMax() {
      if (this.inputs === "") {
        this.$message({
          showClose: true,
          message: "输入不能为空！",
          duration: 1500,
          type: "error",
        });
      } else if (this.inputs < 3) {
        this.$message({
          showClose: true,
          message: "小组人数最小不能小于3人",
          duration: 1500,
          type: "error",
        });
      } else if (this.inputs > 8) {
        this.$message({
          showClose: true,
          message: "小组人数最大不能大于8人",
          duration: 1500,
          type: "error",
        });
      } else {
        this.maxNumber = this.inputs;
        this.isShow = false;
      }
    },
    handleEdit(row) {
      this.topic = { ...row };
      this.dialogVisible = true;
      console.log(this.topic);
    },
    handleDelete(row) {
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(row);
          this.$message({
            type: "success",
            showClose: true,
            duration: 1500,
            message: "删除成功！",
          });
        })
        .catch(() => {
          this.$message({
            type: "error",
            showClose: true,
            duration: 1500,
            message: "已取消删除！",
          });
        });
    },
    clearContent() {
      this.topic = {};
    },
    getTime() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      if (month > 3 && month < 9) {
        this.date = year + "-" + (year + 1) + "第一学期";
      } else {
        this.date = year - 1 + "-" + year + "第二学期";
      }
    },
  },
  mounted() {
    this.getTime();
  },
};
</script>

<style scoped>
.contain {
  width: auto;
  height: 550px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
}
.contain:hover {
  box-shadow: 2px 2px 2px #ccc, -2px -2px 2px #ccc;
}
span {
  display: inline-block;
  margin: 1vh 3vw 1vh 3vw;
}
.button {
  background-color: rgb(64, 158, 255);
  color: #fff;
  border: none;
  font-size: 15px;
  height: 38px;
  border-radius: 5px;
}
.button:hover {
  color: #fff;
  background-color: rgb(74, 148, 245);
}
.input {
  height: 25px;
  width: 150px;
  margin-left: 50px;
  padding: 0 0 0 5px;
}
.input:focus {
  outline: none;
  border: 0.5px solid rgb(64, 158, 255);
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.dialog-bottom {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
</style>