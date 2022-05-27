<template>
  <div class="contrain">
    <el-table :data="tableData" style="width: 90%; margin: 2% 5%">
      <el-table-column type="index"> </el-table-column>
      <el-table-column prop="id" label="组长学号" width="180">
      </el-table-column>
      <el-table-column prop="name" label="组长姓名" width="180">
      </el-table-column>
      <el-table-column prop="title" label="课题名称" width="520">
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
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
        <el-table-column prop="status" label="职务"></el-table-column>
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
    handleEdit(index, row) {
      this.dialogVisible = true;
      console.log(index, row);
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
            this.getAllGroup();
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    //获取所有的小组信息
    getAllGroup() {
      new Promise((resolve, reject) => {
        this.$axios
          .get(`/team/list`, {
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