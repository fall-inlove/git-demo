<template>
  <div class="contrain">
    <el-button type="primary" @click="addGroup" v-if="isAdd"
      >创建小组</el-button
    >
    <div class="tip" v-show="isShow">
      <img :src="tip" alt="" class="noGroup" />
      <span>你还未加入小组，去创建小组来寻找志同道合的伙伴把。</span>
    </div>
    <el-table
      :data="tableData"
      style="width: 80%; margin-left: 10%; margin-top: 20px; height: 350px"
      max-height="350px"
      v-show="!isShow"
    >
      <el-table-column type="index" width="100" label="标号"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="230"> </el-table-column>
      <el-table-column prop="id" label="学号" width="230"> </el-table-column>
      <el-table-column prop="address" label="职位"></el-table-column>
      <el-table-column>
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
    <router-link to="/main/studenttwo" class="router-link" v-if="isCheck"
      >还未选题，去选题</router-link
    >
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
        :default-sort="{ prop: 'class', order: 'ascending' }"
      >
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
        <span style="margin-left: 10px"
          >已选{{ nums }}人/最大可选{{ maxNumber - 1 }}</span
        >
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
          name: "张1",
          id: "1234567891",
        },
        {
          name: "李2",
          id: "9876543212",
        },
        {
          name: "王3",
          id: "876543213",
        },
        {
          name: "张4",
          id: "1234567894",
        },
        {
          name: "李5",
          id: "9876543215",
        },
        {
          name: "王6",
          id: "876543216",
        },
      ],
      tip: require("../assets/images/nogroup.png"),
      isShow: false,
      isAdd: false,
      dialogVisible: false,
      findGroup: "",
      nums: 0,
      maxNumber: 5,
      multipleSelection: [],
      isCheck: true,
    };
  },
  methods: {
    addGroup() {
      this.dialogVisible = true;
      this.isShow = false;
      this.nums = 0;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.nums = this.multipleSelection.length;
      if (this.nums > this.maxNumber - 1) {
        this.$message({
          showClose: true,
          duration: 2000,
          message: "你不能选择超过" + (this.maxNumber - 1) + "人",
          type: "warning",
        });
        this.$refs.multipleTable.toggleRowSelection(
          this.multipleSelection[this.nums - 1]
        );
        //this.multipleSelection.pop();
        console.log(this.multipleSelection);
      }
    },
    selectAll() {
      if (this.tableDatas.length > this.maxNumber) {
        this.$message({
          showClose: true,
          duration: 2000,
          message: "你不能选择超过" + (this.maxNumber - 1) + "人",
          type: "warning",
        });
        this.tableDatas.forEach((row) => {
          console.log(row);
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      }
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
.tip span {
  user-select: none;
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
.router-link {
  display: block;
  width: 160px;
  height: 30px;
  background-color: rgb(64, 158, 255);
  color: white;
  border-radius: 3px;
  font-size: 1em;
  /* 去除a标签下划线 */
  text-decoration: none;
  text-align: center;
  line-height: 30px;
  margin-top: 100px;
}
.router-link:hover {
  background-color: rgb(101, 178, 255);
}
</style>