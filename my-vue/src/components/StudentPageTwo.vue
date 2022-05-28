<template>
  <div class="contrain">
    <el-table
      :data="tableData"
      style="width: 97%"
      class="contain"
      max-height="500px"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item
              label="课题内容->"
              style="overflow: auto; width: 100%; height: 150px"
            >
              <span>{{ props.row.content }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="index" label="编号" width="100"></el-table-column>
      <el-table-column label="题目名" prop="name"> </el-table-column>
      <el-table-column width="400" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-check"
            @click="setele(scope.row)"
            >选择</el-button
          >
        </template></el-table-column
      ></el-table
    >
  </div>
</template>

<script>
export default {
  name: "StudentPageTwo",
  data() {
    return {
      tableData: [],
      res: {},
    };
  },
  methods: {
    //查询所有的课题
    async getTopic() {
      let topic = await new Promise((resolve, reject) => {
        this.$axios
          .get(`/topic/list`, {
            params: {
              classId: this.res.classId,
              status: 1,
              teamId: -1,
            },
          })
          .then((res) => {
            console.log(2323, res.data.data);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
      this.tableData = topic.data.data;
      //console.log(topic);
      console.log(this.res);
    },
    //选择课题
    setele(row) {
      this.$confirm("确定选择这个课题吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.seteleed(row);
          this.$router.push({ path: "/main/studentthree" });
          this.$message({
            type: "success",
            showClose: true,
            duration: 1500,
            message: "课题选择成功！",
          });
        })
        .catch(() => {
          this.$message({
            type: "error",
            showClose: true,
            duration: 1500,
            message: "课题选择失败！",
          });
        });
    },
    seteleed(row) {
      console.log(row.id, this.res);
      new Promise((resolve, reject) => {
        this.$axios
          .get(`/topic/update`, {
            params: {
              id: row.id,
              teamId: this.res.groupId,
            },
          })
          .then((res) => {
            this.getTopic();
            resolve(res);
          })
          .then((err) => {
            reject(err);
          });
      });
    },
    //获取当前用户groupId
    async findGroupId() {
      let result = JSON.parse(localStorage.getItem("res"));
      this.res = result;
      await new Promise((resolve, reject) => {
        this.$axios
          .get(`/student/list`, {
            params: {
              id: result.id,
            },
          })
          .then((res) => {
            this.res = res.data.data[0];
            this.getTopic();
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
  mounted() {
    this.findGroupId();
  },
};
</script>

<style scoped>
.contrain {
  width: auto;
  height: 500px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
}
.contrain:hover {
  box-shadow: 2px 2px 2px #ccc, -2px -2px 2px #ccc;
}
</style>