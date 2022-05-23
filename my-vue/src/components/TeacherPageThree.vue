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
      tableData: [
        {
          id: "19201501",
          name: "张三",
          title: "计算机网络",
        },
        {
          id: "19201502",
          name: "李四",
          title: "分布式数据库",
        },
        {
          id: "19201503",
          name: "王五",
          title: "计算机网络",
        },
      ],
      group: [
        {
          id: "123456789",
          name: "张三",
          status: "组长",
        },
        {
          id: "123456789",
          name: "李四",
          status: "组员",
        },
        {
          id: "123456789",
          name: "王五",
          status: "组员",
        },
      ],
      dialogVisible: false,
    };
  },
  methods: {
    handleEdit(index, row) {
      this.dialogVisible = true;
      console.log(index, row);
    },
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