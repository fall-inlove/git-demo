<template>
  <div class="contrain">
    <div v-show="add">
      <div class="title">
        <span
          >课题名:<el-tag style="font-size: 1em; margin-left: 10px">{{
            topic.name
          }}</el-tag></span
        >
      </div>
      <hr />
      <div class="content">
        <span>{{ topic.content }}</span>
      </div>
    </div>
    <div class="tip" v-show="!add">
      <img :src="tip" alt="" class="noGroup" />
      <span>你还未选题，先去我的小组界面选题组队选题把。</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "StudentPageThree",
  data() {
    return {
      topic: {},
      res: {},
      add: true,
      tip: require("../assets/images/nogroup.png"),
    };
  },
  methods: {
    //获取当前用户groupId
    async findGroupId() {
      let result = JSON.parse(localStorage.getItem("res"));
      this.res = result;
      await new Promise((resolve, reject) => {
        this.$axios
          .get(`/student/list`, {
            params: {
              id: result.id,
            },
          })
          .then((res) => {
            this.res = res.data.data[0];
            if (res.data.data[0].groupId !== -1) {
              this.getTopic();
            } else {
              this.add = false;
            }
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    async getTopic() {
      console.log(this.res.groupId);
      let topic = await new Promise((resolve, reject) => {
        this.$axios
          .get(`/topic/list`, {
            params: {
              teamId: this.res.groupId,
            },
          })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
      console.log(topic);
      if (topic.data.data.length === 0) {
        this.add = false;
      } else {
        this.add = true;
        this.topic = topic.data.data[0];
      }
    },
  },
  mounted() {
    this.findGroupId();
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