<template>
  <div class="table">
    <div class="table-top">
      <div class="top">
        <i class="el-icon-document"></i>
        <span>账号管理</span>
      </div>
    </div>
    <div class="table-bottom">
      <div class="bottom">
        <el-tabs value="first">
          <el-tab-pane label="基本资料" name="first">
            <div class="one">
              <div class="mymessage">
                <span>账号:</span><span>{{ user.account }}</span>
              </div>
              <div class="mymessage">
                <span>姓名:</span><span>{{ user.name }}</span>
              </div>
              <div class="mymessage">
                <span v-if="!status"
                  >身份:<span style="margin-left: 30px">老师</span></span
                >
                <span v-else
                  >身份:<span style="margin-left: 30px">学生</span></span
                >
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="更换头像" name="second">
            <div class="one">
              <img
                :src="user.imageUrl"
                v-if="input2 == null"
                @error="defaultImg"
              />
              <img :src="input2" v-else @error="defaultImg" />
              <div class="imgcard">
                <el-input
                  class="imgurl"
                  placeholder="请输入图片的url"
                  v-model="input"
                  style="width: 500px; margin-right: 20px"
                  clearable
                >
                </el-input>
                <el-button type="primary" @click="inputValue">预览</el-button>
                <el-button
                  type="primary"
                  @click="changeImg"
                  style="margin-left: 20px"
                  >确定</el-button
                >
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="修改密码" name="third">
            <div class="ones">
              <span class="span">旧密码</span>
              <el-input
                placeholder="请输入旧密码"
                v-model="password1"
                show-password
                style="width: 30vw"
              ></el-input
              ><br />
              <span class="span">新密码</span>
              <el-input
                placeholder="请输入新密码"
                v-model="password2"
                show-password
                style="width: 30vw"
              ></el-input
              ><span style="color: red; margin-left: 10px"
                >*密码必须在6-10位之间,区分大小写</span
              >
              <br />
              <span class="span">确认新密码</span>
              <el-input
                placeholder="请输入新密码"
                v-model="password3"
                show-password
                style="width: 30vw"
              ></el-input
              ><br />

              <el-button
                type="primary"
                @click="changePassword"
                style="margin-top: 40px; margin-left: 14vw"
                >确认修改</el-button
              >
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyMessage",
  data() {
    return {
      input: "",
      input2: null,
      password1: "",
      password2: "",
      password3: "",
      user: {
        imageUrl: require("../assets/images/women.png"),
        name: "赵子龙",
        account: "19201524",
        password: "",
        id: "",
      },
      status: "",
    };
  },
  methods: {
    //预览功能实现
    inputValue() {
      if (this.input2 == "") {
        this.$message({
          duration: 1500,
          message: "请先输入图片url",
          type: "warning",
        });
      } else {
        this.input2 = this.input;
      }
    },
    //修改头像
    changeImg() {
      if (this.input !== "") {
        this.user.imageUrl = this.input;
        this.input2 = this.input;
        this.input = "";
        this.$message({
          duration: 1500,
          message: "头像更换成功",
          type: "success",
        });
      } else {
        this.$message({
          duration: 1500,
          message: "请先输入图片url",
          type: "warning",
        });
      }
    },
    //当图片无法正常显示时，显示默认图片
    defaultImg(event) {
      const img = event.srcElement;
      img.src = require("../assets/images/onerror.png");
      img.onerror = null;
    },
    //修改密码
    changePassword() {
      if (this.password1 == "") {
        this.$message({
          duration: 1500,
          message: "请先输入原密码",
          type: "warning",
        });
      } else if (this.password2 == "") {
        this.$message({
          duration: 1500,
          message: "请先输入新密码",
          type: "warning",
        });
      } else if (this.password3 == "") {
        this.$message({
          duration: 1500,
          message: "请再次输入新密码",
          type: "warning",
        });
      } else if (this.password1 != this.user.password) {
        this.$message({
          duration: 1500,
          message: "原密码错误！请重新输入",
          type: "error",
        });
        this.password1 = this.password2 = this.password3 = "";
      } else if (this.password2.length < 6 || this.password2.length > 10) {
        this.$message({
          duration: 1500,
          message: "新密码的长度必须在8-16位之间,请重新输入。",
          type: "error",
        });
        this.password1 = this.password2 = this.password3 = "";
      } else if (this.password2 != this.password3) {
        this.$message({
          duration: 1500,
          message: "两次输入的新密码不一致，请重新输入",
          type: "error",
        });
        this.password1 = this.password2 = this.password3 = "";
      } else if (this.password1 == this.password2) {
        this.$message({
          duration: 1500,
          message: "新密码不能与旧密码相同,请重新输入",
          type: "success",
        });
        this.password1 = this.password2 = this.password3 = "";
      } else {
        console.log(this.user.id, this.password2);
        this.$axios
          .get(`/${this.status ? "student" : "teacher"}/update`, {
            params: {
              id: this.user.id,
              password: this.password2,
            },
          })
          .then((res) => {
            this.$message({
              duration: 1500,
              message: "密码修改成功,请重新登录。",
              type: "success",
            });
            sessionStorage.removeItem("user");
            this.$router.push({ path: "/" });
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    //获取用户信息
    async getUser() {
      let user = JSON.parse(localStorage.getItem("user"));
      let checkStudent = JSON.parse(localStorage.getItem("people"));
      let res = await new Promise((resolve, reject) => {
        this.$axios
          .get(`/${checkStudent ? "student" : "teacher"}/login`, {
            params: {
              account: user.account,
              password: user.password,
            },
          })
          .then((res) => {
            this.user.name = res.data.data.name;
            this.user.account = res.data.data.account;
            this.user.password = res.data.data.password;
            this.user.id = res.data.data.id;
            console.log(this.user.id);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
      return res;
    },
  },
  mounted() {
    this.status = JSON.parse(localStorage.getItem("people")); //true为学生，false为老师
    this.getUser();
  },
};
</script>

<style scoped>
.table-top {
  width: 100%;
  height: 15vh;
  border-radius: 10px 10px 0 0;
  background-color: rgb(234, 234, 234);
  font-size: 19px;
  overflow: hidden;
  line-height: 4vh;
}
.top i {
  font-size: 35px;
}
.top {
  height: 8vh;
  margin: 6vh 2vw 4vh 2vw;
  border: 0.5px solid rgb(234, 234, 234);
  border-bottom-color: #666;
}
.table-bottom {
  width: 100%;
  height: 73vh;
  background-color: rgb(234, 234, 234);
  border-radius: 0 0 10px 10px;
}
.bottom {
  margin-left: 2vw;
}
.one {
  margin-top: 15px;
}
.mymessage {
  line-height: 40px;
}
.mymessage span:nth-child(n) {
  margin-left: 10px;
  margin-right: 20px;
}
.one img {
  width: 20vh;
  height: 20vh;
  border-radius: 50%;
}
.imgcard {
  float: right;
  margin-right: 16vw;
  margin-top: 7vh;
}
.span {
  display: inline-block;
  width: 6vw;
  text-align-last: justify;
  line-height: 3vh;
  margin-top: 30px;
  margin-right: 20px;
}
</style>