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
      <el-table-column prop="type" label="职位"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            :style="canClick(scope.row)"
            @click="handleEdit(scope.$index, scope.row)"
            >联系</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <router-link to="/main/studenttwo" class="router-link" v-if="isCheck"
      >还未选题? 去选题</router-link
    >
    <el-dialog title="请选择" :visible.sync="dialogVisible" width="50%">
      <el-input
        placeholder="输入学号,点击enter搜索"
        v-model="findGroup"
        class="in-enter"
        @keyup.enter.native="findGroupFun"
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
        <el-table-column type="selection" width="100"> </el-table-column>
        <el-table-column prop="id" label="学号"> </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
      </el-table>
      <div class="table-bottom">
        <span style="margin-left: 10px"
          >已选{{ nums }}人/最大可选{{ maxNumber - 1 }}</span
        >
        <el-button type="primary" @click="createGroup">添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "StudentPageOne",
  data() {
    return {
      tableData: [],
      tableDatas: [],
      tip: require("../assets/images/nogroup.png"),
      isShow: false,
      isAdd: false,
      dialogVisible: false,
      findGroup: "",
      nums: 0,
      res: {},
      maxNumber: 5,
      multipleSelection: [],
      isCheck: true,
    };
  },
  methods: {
    canClick(row) {
      if (row.id === this.res.id) {
        return "display:none";
      }
    },
    handleEdit(index, row) {
      console.log(index, row.id, this.res.id);
    },
    // 添加小组
    addGroup() {
      if (this.maxNumber === 0) {
        this.$message({
          type: "error",
          showClose: true,
          duration: 1500,
          message: "老师还没有设置人数限制，请稍后再开始组队！",
        });
      } else {
        this.dialogVisible = true;
        //this.isShow = false;
        this.nums = 0;
        this.findAllStudent();
      }
    },
    //创建小组，并将选择的学生添加到小组中
    createGroup() {
      this.setHeader();
      this.isShow = false;
      this.multipleSelection.forEach((item) => {
        //console.log(item.id, this.res.id);
        this.changeGroupId(item.id, this.res.id);
      });
      this.changeGroupId(this.res.id, this.res.id);
      this.findIsAdd();
      this.isCheck = true;
      this.dialogVisible = false;
    },
    //创建小组，将创建者设置为小组长
    setHeader() {
      new Promise((resolve, reject) => {
        this.$axios
          .get(`/team/save`, {
            params: {
              id: this.res.id,
              headerId: this.res.id,
            },
          })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    //改变小组成员的groupId
    changeGroupId(id, groupId) {
      new Promise((resolve, reject) => {
        this.$axios
          .get(`/student/update`, {
            params: {
              id,
              groupId,
            },
          })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    //选择改变触发
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
        console.log(this.multipleSelection);
      }
    },
    //全选
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
    //搜索所有本班可供选择的学生
    findAllStudent() {
      new Promise((resolve, reject) => {
        this.$axios
          .get("/student/list", {
            params: {
              classId: this.res.classId,
              groupId: -1,
            },
          })
          .then((res) => {
            console.log(this.res.account);

            this.tableDatas = res.data.data;
            this.tableDatas.forEach((row, index) => {
              if (row.account === this.res.account) {
                this.tableDatas.splice(index, 1);
              }
            });

            console.log(this.tableDatas);
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    //搜索所有组内成员
    findGroupMember() {
      console.log(this.res.groupId);
      new Promise((resolve, reject) => {
        this.$axios
          .get("/student/list", {
            params: {
              groupId: this.res.groupId,
            },
          })
          .then((res) => {
            console.log("000", res.data.data);
            for (let i = 0; i < res.data.data.length; i++) {
              this.tableData.push(res.data.data[i]);
              if (this.tableData[i].id == this.res.groupId) {
                this.tableData[i].type = "组长";
              } else {
                this.tableData[i].type = "组员";
              }
            }
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    //查询组员数量限制数据
    findMaxNumber() {
      //console.log(this.res.classId);
      new Promise((resolve, reject) => {
        this.$axios
          .get(`/clazz/list`, {
            params: {
              id: this.res.classId,
            },
          })
          .then((res) => {
            this.maxNumber = res.data.data[0].groupMax;
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    //获取当前用户groupId
    async findGroupId() {
      await new Promise((resolve, reject) => {
        this.$axios
          .get(`/student/list`, {
            params: {
              id: this.res.id,
            },
          })
          .then((res) => {
            this.res = res.data.data[0];
            this.res.groupId = res.data.data[0].groupId;
            this.findGroupMember();
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    //判断是否加入小组,如果已经加入小组则执行搜索成员操作,如果没有加入小组则查询组员数量限制数据
    async findIsAdd() {
      let result = JSON.parse(localStorage.getItem("res"));
      this.res = result;
      let res = await new Promise((resolve, reject) => {
        this.$axios
          .get(`/student/list`, {
            params: {
              id: result.id,
            },
          })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
      //console.log(res.data.data);
      if (res.data.data[0].groupId === -1) {
        //未加入小组
        this.isAdd = true; //显示加入按钮
        this.isShow = true; //显示图片
        this.isCheck = false; //不显示选题按钮
        this.findMaxNumber();
      } else {
        console.log(res.data.data[0].groupId);
        this.findGroupId();
        this.isSetele(res.data.data[0].groupId);
        this.isAdd = false;
        this.isShow = false;
      }
    },
    //判断是否选择过课题
    isSetele(groupId) {
      console.log(this.res.groupId);
      new Promise((resolve, reject) => {
        this.$axios
          .get(`/topic/list`, {
            params: {
              teamId: groupId,
              status: 1,
            },
          })
          .then((res) => {
            console.log(res.data.data);
            if (res.data.data.length > 0) {
              //this.isShow = false;
              this.isCheck = false;
            }
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    //添加组员
    addPeople() {
      let arr = [];
      this.tableDatas.forEach((item) => {
        if (item.account === this.findGroup) {
          arr.push(item);
        }
      });
      this.tableDatas = arr;
    },
    //搜索单人
    findGroupFun() {
      if (this.findGroup === "") {
        this.findAllStudent();
      } else {
        this.addPeople();
      }
    },
  },
  mounted() {
    this.findIsAdd();
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