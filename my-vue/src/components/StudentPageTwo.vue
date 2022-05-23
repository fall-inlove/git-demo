<template>
  <div class="contrain">
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