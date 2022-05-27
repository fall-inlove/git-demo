<template>
  <div class="main-border">
    <div class="main-header">
      <div class="header-title">
        <i class="el-icon-collection"></i>
        {{ title }}
      </div>
      <div class="header-right">
        <i class="el-icon-bell tip" v-if="nums == 0"></i>
        <el-badge is-dot v-else class="itemf">
          <i class="el-icon-bell tip"></i>
        </el-badge>
        <img
          :src="user.imageUrl"
          @mouseover="cardshow"
          @mouseout="cardshow"
          @error="defaultImg"
        />
      </div>
    </div>
    <transition name="fade">
      <div
        class="mycard"
        v-show="isCardShow"
        @mouseover="cardshow"
        @mouseout="cardshow"
      >
        <div class="item" @click="SeeMessage">账号管理</div>
        <div class="item" @click="SignOut">退出登录</div>
      </div>
    </transition>
    <div class="main-left">
      <div class="myimg">
        <img
          class="leftimg"
          :src="user.imageUrl"
          @mouseover="cardshow"
          @mouseout="cardshow"
          @error="defaultImg"
        />
        <span>{{ user.name }}</span>
      </div>
      <div class="hr"></div>
      <MenuGroup />
    </div>

    <div class="main-middle">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import MenuGroup from "@/components/MenuGroup.vue";
export default {
  name: "MainPage",
  components: { MenuGroup },
  data() {
    return {
      title: "课设系统",
      isCardShow: false,
      nums: 10,
      user: {
        imageUrl: require("../assets/images/women.png"),
        name: "赵子龙",
      },
    };
  },
  methods: {
    cardshow() {
      this.isCardShow = !this.isCardShow;
    },
    defaultImg(event) {
      const img = event.srcElement;
      img.src = require("../assets/images/onerror.png");
      img.onerror = null;
    },
    SignOut() {
      console.log(this);
      this.$confirm("确定退出登陆吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          sessionStorage.removeItem("user");
          this.$router.push({ path: "/" });
          this.$message({
            type: "success",
            showClose: true,
            duration: 1500,
            message: "退出登录成功！",
          });
        })
        .catch(() => {
          this.$message({
            type: "error",
            showClose: true,
            duration: 1500,
            message: "已取消退出登录！",
          });
        });
    },
    SeeMessage() {
      this.$router.push({ path: "/main/message" });
    },
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
    this.getUser();
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.main-border {
  width: 100%;
  height: 100%;
}
.main-border .main-header {
  width: 100vw;
  height: 8vh;
  position: fixed;
  background-image: linear-gradient(#838383, #e0e0e0);
  overflow: hidden;
}
.header-title {
  user-select: none;
  float: left;
  line-height: 8vh;
  margin-left: 5vw;
  font-size: 22px;
  font-weight: 500;
  color: rgb(66, 66, 66);
}
.header-right {
  float: right;
  margin-right: 4vw;
  height: 8vh;
  font-size: 30px;
  color: rgb(68, 67, 67);
}
.tip {
  margin-right: 0px;
  margin-bottom: 28px;
}
.itemf {
  margin-right: 40px;
  margin-bottom: 8px;
}

.tip:hover {
  color: rgb(145, 145, 145);
}
.header-right img {
  width: 7vh;
  height: 7vh;
  border-radius: 50%;
  margin-top: 0.5vh;
}
.mycard {
  position: absolute;
  right: 1.8vw;
  top: 8vh;
  width: 8vw;
  height: 8vh;
  z-index: 100;
  color: #000;
  padding-top: 0.3vh;
  padding-bottom: 0.5vh;
  background-color: rgb(250, 250, 250);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgb(255, 255, 255);
  box-shadow: 1px 1px 2px rgb(220, 219, 219), -1px -1px 2px rgb(220, 219, 219);
}
.fade-enter,
.fade-leave-to {
  height: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.item {
  font-size: 11px;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 4vh;
  line-height: 4vh;
  text-align: center;
  cursor: pointer;
}

.item:hover {
  background-color: rgb(236, 235, 235);
}
.main-border .main-left {
  width: 16vw;
  height: 88vh;
  position: fixed;
  top: 9vh;
  background-image: linear-gradient(#3b3b3b, #aaaaaa);
  object-fit: cover;
  margin: 2vh 1vh 1vh 2vh;
  border-radius: 10px;
  overflow: hidden;
}
.hr {
  border: 0.5px solid rgb(127, 127, 127);
}
.myimg {
  color: #fff;
  flex-direction: column;
  text-align-last: center;
  padding: 2vw 4vw 2vw 4vw;
}
.leftimg {
  width: 8vw;
  border-radius: 50%;
  margin-bottom: 25px;
}
.main-border .main-middle {
  width: 78vw;
  float: right;
  height: 88vh;
  margin: 11vh 4vh 1vh 4vh;
  border-radius: 10px;
}
</style>