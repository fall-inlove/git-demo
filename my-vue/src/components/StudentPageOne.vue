<template>
  <div class="contrain">
    <el-button type="primary" @click="addGroup">创建小组</el-button>
    <div class="tip" v-show="isShow">
      <img :src="tip" alt="" class="noGroup" />
      <span>你还未加入小组，去创建小组来寻找志同道合的伙伴把。</span>
    </div>
    <el-table
      :data="tableData"
      style="width: 80%; margin-left: 10%; margin-top: 20px"
      v-show="!isShow"
    >
      <el-table-column type="index" width="100" label="标号"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="230"> </el-table-column>
      <el-table-column prop="id" label="学号" width="230"> </el-table-column>
      <el-table-column prop="address" label="职位"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
            >联系</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="请选择" :visible.sync="dialogVisible" width="50%">
      <el-input
        placeholder="输入学号,点击enter搜索"
        v-model="findGroup"
        class="in-enter"
      />
      <el-table
        :data="tableDatas"
        border
        ref="multipleTable"
        @selection-change="handleSelectionChange"
        style="width: 100%; height: 50%"
        max-height="250px"
      >
        :default-sort="{ prop: 'class', order: 'ascending' }" >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="id" label="学号" width="200"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="200">
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="200">
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
      <div class="table-bottom">
        <span style="margin-left: 10px">已选{{ nums }}人</span>
        <el-button type="primary">添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "StudentPageOne",
  data() {
    return {
      tableData: [
        {
          name: "张三",
          id: "123456789",
          address: "组长",
        },
        {
          name: "李四",
          id: "987654321",
          address: "组员",
        },
        {
          name: "王五",
          id: "87654321",
          address: "组员",
        },
      ],
      tableDatas: [
        {
          name: "张三",
          id: "123456789",
        },
        {
          name: "李四",
          id: "987654321",
        },
        {
          name: "王五",
          id: "87654321",
        },
        {
          name: "张三",
          id: "123456789",
        },
        {
          name: "李四",
          id: "987654321",
        },
        {
          name: "王五",
          id: "87654321",
        },
      ],
      tip: require("../assets/images/nogroup.png"),
      isShow: false,
      dialogVisible: false,
      findGroup: "",
      nums: 0,
      multipleSelection: [],
    };
  },
  methods: {
    addGroup() {
      this.dialogVisible = true;
      this.nums = 0;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.nums = this.multipleSelection.length;
    },
  },
};
</script>

<style scoped>
.tip {
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 100px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  color: rgb(136, 136, 136);
}
.noGroup {
  width: 300px;
  height: 300px;
}
.in-enter {
  width: 300px;
  margin-bottom: 10px;
  float: right;
}
.table-bottom {
  width: 100%;
  height: 50px;
  display: flex;
  margin-top: 10px;
  justify-content: space-between;
  align-items: center;
}
.table-bottom button {
  margin-right: 50px;
}
</style>