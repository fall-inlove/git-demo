<template>
  <div class="login_demo">
    <transition>
      <div class="card" v-show="isshow">
        <div class="black">
          <i class="el-icon-user user">:</i>
          账号：<input
            placeholder="请输入账号(学号）"
            v-model="query.account"
            class="input"
            type="text"
            ref="inputCount"
            @keydown.enter="Check"
            @keyup="changeCount"
            @keydown="changeCount"
          />
          <i class="el-icon-circle-close clear" @click="clear"></i>
          <div v-if="isshowc" class="warn">账号不能为空</div>
        </div>
        <div class="black">
          <i class="el-icon-key pass">:</i>
          密码：<input
            placeholder="请输入密码"
            v-model="query.password"
            class="input"
            :type="passwords"
            @keydown.enter="Check"
            @keyup="changePassword"
            @keydown="changePassword"
          /><br />
          <i
            class="open"
            @click="openSee"
            v-bind:class="{
              'el-icon-open': !isopen,
              'el-icon-turn-off': isopen,
              openColor: !isopen,
              warnDown: isshowc,
            }"
          ></i>
          <div v-if="isshowpa" class="warn">密码不能为空</div>
        </div>
        <div class="black">
          <input
            type="radio"
            class="checkbox"
            name="radio1"
            :checked="checkStudent"
            @click="student"
            style="margin-left: -5px"
          />学生
          <input
            type="radio"
            class="checkbox"
            name="radio1"
            :checked="checkTeacher"
            @click="student"
          />教师
          <input
            type="radio"
            class="checkbox"
            name="radio2"
            :checked="checkRemember"
            @click="remember"
          />记住密码<br />
        </div>
        <div class="black">
          <el-button type="primary" class="button" @click="CheckLogin"
            >登录</el-button
          >
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "PeopleLogin",
  data() {
    return {
      query: {
        account: "",
        password: "",
      },
      // 判断是否通过登录
      flag: false,
      checkStudent: true,
      checkTeacher: false,
      checkRemember: false,
      isshowc: false,
      isshowpa: false,
      isshowch: false,
      isshow: false,
      isopen: true,
      passwords: "password",
    };
  },
  methods: {
    getStuData() {
      this.$axios("/student/login", {
        params: this.query,
      }).then((resp) => {
        if (resp.data.code == 200 && resp.data.data != null) {
          console.log(resp.data.data);
          this.flag = true;
        }
      });
    },
    getTeaData() {
      this.$axios("/teacher/login", {
        params: this.query,
      }).then((resp) => {
        if (resp.data.code == 200 && resp.data.data != null) {
          console.log(resp.data.data);
          this.flag = true;
        }
      });
    },
    CheckLogin() {
      if (this.checkStudent) {
        this.getStuData();
      } else {
        this.getTeaData();
      }
      setTimeout(() => {
        this.Check();
      }, 100);
    },
    Check() {
      if (this.query.account === "") {
        this.isshowc = true;
      } else if (this.query.password === "") {
        this.isshowpa = true;
      } else {
        if (this.flag) {
          this.isshow = false;

          let p = {
            count: this.query.account,
            password: this.query.password,
          };
          localStorage.setItem("user", JSON.stringify(p));
          localStorage.setItem("remember", this.checkRemember);
          localStorage.setItem("people", this.checkStudent);
          sessionStorage.setItem("user", JSON.stringify(p));
          this.$message({
            showClose: true,
            message: "登录成功",
            duration: 1500,
            type: "success",
          });
          setTimeout(() => {
            this.$router.push({ path: "/main" });
          }, 1000);
        } else {
          this.$message({
            showClose: true,
            message: "账号或者密码错误！",
            duration: 1500,
            type: "error",
          });
          this.query.account = "";
          this.query.password = "";
          this.flag = false;
        }
      }
      //console.log(this._data);
    },
    changeCount() {
      this.query.account = this.query.account.replace(" ", "");
      if (this.query.account != "") {
        this.isshowc = false;
      }
    },
    changePassword() {
      this.query.password = this.query.password.replace(" ", "");
      if (this.query.password != "") {
        this.isshowpa = false;
      }
    },
    student() {
      this.checkStudent = !this.checkStudent;
      this.checkTeacher = !this.checkTeacher;
    },
    remember() {
      this.checkRemember = !this.checkRemember;
    },
    clear() {
      this.query.account = "";
    },
    openSee() {
      if (this.isopen) {
        this.passwords = "text";
      } else {
        this.passwords = "password";
      }
      this.isopen = !this.isopen;
    },
  },
  mounted() {
    this.isshow = true;
    if (localStorage.getItem("remember") === "true") {
      this.checkRemember = true;
      if (localStorage.getItem("user")) {
        let p = JSON.parse(localStorage.getItem("user"));
        this.query.account = p.count;
        this.query.password = p.password;
      }
      if (localStorage.getItem("people") === "false") {
        this.checkStudent = false;
        this.checkTeacher = true;
      }
    }
    this.$nextTick(function () {
      this.$refs.inputCount.focus();
    });
  },
};
</script>


<style scoped>
.login_demo {
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/images/login.jpg");
  background-size: cover;
  background-position: center;
  position: relative;
}
.card {
  width: 500px;
  height: 270px;
  background-color: rgba(255, 255, 255, 0.8);
  position: relative;
  border-radius: 10px;
  padding-top: 10px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px soild transparent;
  box-shadow: 5px 5px 5px rgb(173, 173, 173), -5px -5px 5px rgb(173, 173, 173);
}

.black {
  line-height: 55px;
  text-align: center;
  margin-top: 5px;
}
.black .checkbox {
  margin-left: 55px;
}
.input {
  width: 250px;
  height: 32px;
  padding-left: 34px;
  padding-right: 35px;
  background-color: transparent !important;

  border-radius: 5px;
  font-size: 15.7px;
}
.input:focus {
  outline: none;
  border: 2px solid rgba(64, 158, 255, 0.5);
}
.openColor {
  color: rgb(64, 158, 255);
}
.clear {
  position: absolute;
  top: 14%;
  left: 82%;
  font-size: 15px;
}
.open {
  position: absolute;
  top: 35%;
  left: 82%;
}
.user {
  position: absolute;
  top: 14%;
  left: 24%;
  font-size: 15px;
}
.pass {
  position: absolute;
  top: 35%;
  left: 24%;
}
.warnDown {
  top: 40%;
}
.button {
  width: 100px;
}
.warn {
  color: red;
  font-size: 10px;
  line-height: 11.5px;
}
.v-enter-active {
  animation: run 1s;
}
.v-leave-active {
  animation: run 1s reverse;
}
@keyframes run {
  from {
    top: -20%;
  }
  to {
    top: 50%;
  }
}
</style>
