<template>
  <div class="contarin">
    <el-table
      :data="tableData"
      border
      style="width: 100%; height: 90%"
      :default-sort="{ prop: 'id', order: 'ascending' }"
    >
      <el-table-column
        fixed
        type="index"
        label="编号"
        width="100"
        height="500px"
      ></el-table-column>
      <el-table-column prop="id" label="班级" width="150"></el-table-column>
      <el-table-column label="时间" width="250">{{ time }}</el-table-column>
      <el-table-column prop="amount" label="人数" width="150"></el-table-column>
      <el-table-column prop="object" label="科目" width="200"></el-table-column>
      <el-table-column fixed="right" width="250" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="hand(scope.row)"
            >分配</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="bottom">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next, sizes, jumper"
        :total="pagination.total"
        :page-sizes="[5, 10, 15, 20, 50, 100]"
        :page-size="pagination.pageSize"
        :current-page="pagination.currentPage"
      >
      </el-pagination>
    </div>
    <el-dialog title="请选择" :visible.sync="dialogVisible" width="50%">
      <el-table
        :data="teacherData"
        border
        style="width: 100%; height: 90%"
        :default-sort="{ prop: 'index', order: 'ascending' }"
      >
        <el-table-column
          fixed
          type="index"
          label="编号"
          width="100"
        ></el-table-column>
        <el-table-column prop="id" label="教师号" width="150"></el-table-column>
        <el-table-column
          prop="name"
          label="教师姓名"
          width="150"
        ></el-table-column>
        <el-table-column label="时间" width="200">{{ time }}</el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="handleClick(scope.row)"
              >选择</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "TeacherPageOne",
  data() {
    return {
      tableData: [],
      teacherData: [],
      pagination: {
        currentPage: 1,
        pageSize: 5,
        total: 10,
      },
      currentClass: {},
      time: "",
      dialogVisible: false,
      searchInput: "",
    };
  },
  methods: {
    //当前页改变
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.getData();
    },
    //页面大小改变
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.getData();
    },
    handleClick(row) {
      //console.log(this.currentClass.id);
      //console.log(row);
      let res = new Promise((reslove, reject) => {
        this.$axios
          .get("/teacher/update", {
            params: { id: row.id, classId: this.currentClass.id },
          })
          .then((res) => {
            reslove(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
      let re = new Promise((reslove, reject) => {
        this.$axios
          .get("/clazz/update", {
            params: { id: this.currentClass.id, type: 2 },
          })
          .then((res) => {
            reslove(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
      this.$confirm("确定选择吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          res.then((res) => {
            this.getTeacher();
            this.dialogVisible = false;
            console.log(res);
          });
          re.then(() => {
            this.getData();
          });
          this.$message({
            type: "success",
            showClose: true,
            duration: 1500,
            message: "选择成功！",
          });
        })
        .catch(() => {
          this.$message({
            type: "error",
            showClose: true,
            duration: 1500,
            message: "已取消！",
          });
        });
    },
    hand(row) {
      this.currentClass = row;
      this.dialogVisible = true;
      this.getTeacher();
    },
    getTeacher() {
      let res = new Promise((resolve, reject) => {
        this.$axios
          .get("/teacher/list", {
            params: {
              classId: -1,
            },
          })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
      res.then((res) => {
        //console.log(res);
        this.teacherData = res.data.data;
      });
    },
    //获取本地时间
    getTime() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      if (month > 3 && month < 9) {
        this.time = year - 1 + "-" + year + "第二学期";
      } else {
        this.time = year + "-" + (year + 1) + "第一学期";
      }
    },
    //获取班级数据
    getData() {
      let object = ["前端", "java", "软件构造"];
      let res = new Promise((resolve, reject) => {
        this.$axios
          .get("/clazz/list", {
            params: {
              type: 1,
            },
          })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
      res.then((res) => {
        //console.log(res);
        let data = res.data.data;
        data.forEach((item) => {
          item.object = object[(data.length - 1) % 3];
        });
        this.tableData = data;
        this.pagination.total = res.data.data.length;
      });
    },
  },
  mounted() {
    this.getTime();
    this.getData();
  },
};
</script>

<style scoped>
.contarin {
  width: auto;
  height: 600px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
}
.contarin:hover {
  box-shadow: 2px 2px 2px #ccc, -2px -2px 2px #ccc;
}
.contarin .bottom {
  margin-top: 2vh;
  display: flex;
  justify-content: center;
}
</style>