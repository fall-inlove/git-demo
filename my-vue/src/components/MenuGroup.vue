<template>
  <div class="group">
    <el-col :span="24">
      <el-menu
        :default-active="active"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="transparent"
        text-color="#fff"
        font-size:20px
        active-text-color="#0ff"
        :unique-opened="true"
        router
      >
        <el-submenu index="1" v-show="!isStudent">
          <template slot="title">
            <i class="el-icon-location backgroup"></i>
            <span>老师界面</span>
          </template>
          <el-menu-item index="/main/teacherone">任务分配</el-menu-item>
          <el-menu-item index="/main/teachertwo">我的课题</el-menu-item>
          <el-menu-item index="/main/teacherthree">我的班级</el-menu-item>
          <el-menu-item index="1-4">选项4</el-menu-item>
        </el-submenu>
        <el-submenu index="2" v-show="isStudent">
          <template slot="title">
            <i class="el-icon-location backgroup"></i>
            <span>学生界面</span>
          </template>
          <el-menu-item index="/main/studentone">我的小组</el-menu-item>
          <el-menu-item index="/main/studentthree">我的课题</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-menu-item index="2-4">选项4</el-menu-item>
        </el-submenu>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "MenuGroup",
  data() {
    return {
      active: "/main/studentone",
      isStudent: false,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  mounted() {
    if (localStorage.getItem("people") === "true") {
      this.isStudent = true;
    }
    //this.$nextTick(() => {
    if (!this.isStudent) {
      this.active = "/main/teacherone";
    } else {
      this.active = "/main/studentone";
    }
    this.$router.push(this.active);
    //});
    console.log(this.active);
  },
};
</script>

<style scoped>
.group {
  display: flex;
  justify-items: center;
}
i,
span {
  font-size: 16px;
}
</style>