<template>
  <div class="contrain">
    <div class="title">
      <span
        >课题名:<el-tag style="font-size: 1em; margin-left: 10px">{{
          topic.title
        }}</el-tag></span
      >
    </div>
    <hr />
    <div class="content">
      <span>{{ topic.content }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "StudentPageThree",
  data() {
    return {
      topic: {
        title: "课设管理系统",
        content: "王小虎是一只猫",
      },
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
.title {
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
}
.content {
  width: 100%;
  overflow: auto;
}
</style>