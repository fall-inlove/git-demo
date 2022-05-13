<template>
  <div class="contarin">
    <el-table
      :data="tableData"
      border
      style="width: 100%; height: 90%"
      :default-sort="{ prop: 'class', order: 'ascending' }"
    >
      <el-table-column
        fixed
        type="index"
        label="编号"
        width="100"
      ></el-table-column>
      <el-table-column prop="class" label="班级" width="200"></el-table-column>
      <el-table-column label="时间" width="250">{{ time }}</el-table-column>
      <el-table-column prop="number" label="人数" width="200"></el-table-column>
      <el-table-column prop="object" label="科目" width="220"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleClick(scope.row)"
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
        :data="tableData"
        border
        style="width: 100%; height: 90%"
        :default-sort="{ prop: 'class', order: 'ascending' }"
      >
        <el-table-column
          fixed
          type="index"
          label="编号"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="class"
          label="老师"
          width="150"
        ></el-table-column>
        <el-table-column label="时间" width="200">{{ time }}</el-table-column>
        <el-table-column
          prop="object"
          label="科目"
          width="150"
        ></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="getTeacher(scope.row)"
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
      tableData: [
        {
          class: "192015",
          number: 32,
          object: "前端",
        },
        {
          class: "192015",
          number: 32,
          object: "java",
        },
        {
          class: "192015",
          number: 32,
          object: "软件构造",
        },
      ],
      pagination: {
        currentPage: 1,
        pageSize: 5,
        total: 10,
      },
      currentClass: {},
      time: "",
      dialogVisible: false,
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
      this.currentClass = row;
      this.dialogVisible = true;
    },
    getTeacher(row) {
      console.log(row);
      this.dialogVisible = false;
    },
    getTime() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      if (month > 3 && month < 9) {
        this.time = year + "-" + (year + 1) + "第一学期";
      } else {
        return year - 1 + "-" + year + "第二学期";
      }
    },
  },
  mounted() {
    this.getTime();
  },
};
</script>

<style scoped>
.contarin {
  width: 100%;
  height: 100%;
}
.contarin .bottom {
  margin-top: 2vh;
  display: flex;
  justify-content: center;
}
</style>