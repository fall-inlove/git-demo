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
        <el-tag v-if="!isShow" mode="out-in">{{ maxNumber }}人</el-tag>
        <input
          v-else
          type="number"
          class="input"
          mode="out-in"
          ref="inputNumber"
          v-model.number="inputs"
          @keydown.enter="changeMax"
        />
      </span>
      <button class="button" @click="change" v-show="!isShow">编辑</button>
    </div>
    <el-table :data="tableData" style="width: 100%">
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
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "TeacherPageTwo",
  data() {
    return {
      date: "2022第二学期",
      classes: "192015",
      inputs: "",
      isShow: false,
      maxNumber: 5,
      tableData: [
        {
          name: "王小虎",
          content:"王小虎是一只猫",
        },
        {
          name: "王小虎",
          content:"王小虎是一只猫",
        },
      ],
    };
  },
  methods: {
    change() {
      this.isShow = !this.isShow;
      this.inputs = this.maxNumber;
      this.$nextTick(function () {
        this.$refs.inputNumber.focus();
      });
    },
    changeMax() {
      if (this.inputs === "") {
        this.$message({
          showClose: true,
          message: "请先输入有效数字",
          duration: 1500,
          type: "error",
        });
      } else if (this.inputs < 3) {
        this.$message({
          showClose: true,
          message: "小组人数不能小于3人",
          duration: 1500,
          type: "error",
        });
      } else if (this.inputs > 8) {
        this.$message({
          showClose: true,
          message: "小组人数不能大于8人",
          duration: 1500,
          type: "error",
        });
      } else {
        this.maxNumber = this.inputs;
        this.isShow = !this.isShow;
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
span {
  margin: 1vh 3vw 3vh 3vw;
}
.button {
  background-color: rgb(64, 158, 255);
  color: #fff;
  border: none;
  font-size: 15px;
  width: 80px;
  height: 38px;
  border-radius: 5px;
}
.button:hover {
  background-color: rgb(120, 177, 255);
}
.input {
  height: 25px;
  width: 150px;
  margin-left: 50px;
  padding: 0 0 0 5px;
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
</style>