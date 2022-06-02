<template>
  <div class="contrain">
    <el-table :data="tableData" style="width: 90%; margin: 2% 5%">
      <el-table-column type="index"> </el-table-column>
      <el-table-column prop="teamId" label="组长学号" width="180">
      </el-table-column>
      <el-table-column prop="student.name" label="组长姓名" width="180">
      </el-table-column>
      <el-table-column prop="name" label="课题名称" width="520">
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="小组信息" :visible.sync="dialogVisible" width="50%">
      <el-table
        :data="group"
        border
        style="width: 100%; height: 90%; margin-bottom: 20px"
      >
        <el-table-column fixed type="index" width="80"></el-table-column>
        <el-table-column prop="id" label="学号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="type" label="职务"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "TeacherPageThree",
  data() {
    return {
      tableData: [],
      group: [],
      dialogVisible: false,
      res: {},
    };
  },
  methods: {
    handleEdit(row) {
      this.dialogVisible = true;
      console.log(row);
      this.findGroupMember(row);
    },
    //获取当前用户班级id
    async findClassId() {
      let result = JSON.parse(localStorage.getItem("res"));
      this.res = result;
      await new Promise((resolve, reject) => {
        this.$axios
          .get(`/teacher/list`, {
            params: {
              id: result.id,
            },
          })
          .then((res) => {
            this.res = res.data.data[0];
            this.getTopicDetail();
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    //搜索所有组内成员
    findGroupMember(row) {
      this.group = [];
      new Promise((resolve, reject) => {
        this.$axios
          .get("/student/list", {
            params: {
              groupId: row.teamId,
            },
          })
          .then((res) => {
            console.log("000", res.data.data);
            for (let i = 0; i < res.data.data.length; i++) {
              this.group.push(res.data.data[i]);
              if (this.group[i].id == row.teamId) {
                this.group[i].type = "组长";
              } else {
                this.group[i].type = "组员";
              }
            }
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    //查看小组信息
    getTopicDetail() {
      new Promise((resolve, reject) => {
        this.$axios
          .get(`/topicDetail/list`, {
            params: {
              classId: this.res.classId,
            },
          })
          .then((res) => {
            this.tableData = res.data.data;
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
  mounted() {
    this.findClassId();
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