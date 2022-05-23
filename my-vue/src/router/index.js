import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
const originalPush = Router.prototype.push;
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

import Login from "@/components/Login";
import Main from "@/components/MainPage";
import Message from "@/components/MyMessage";
import TeacherPageOne from "@/components/TeacherPageOne";
import TeacherPageTwo from "@/components/TeacherPageTwo";
import StudentPageOne from "@/components/StudentPageOne";
import StudentPageTwo from "@/components/StudentPageTwo";
const router = new Router({
  //mode:'history',
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login,
    },
    {
      path: "/main",
      name: "Main",
      component: Main,
      children: [
        {
          path: "message",
          name: "Message",
          component: Message,
        },
        {
          path: "teacherone",
          component: TeacherPageOne,
        },
        {
          path: "teachertwo",
          component: TeacherPageTwo,
        },
        {
          path: "studentone",
          component: StudentPageOne,
        },
        {
          path: "studenttwo",
          component: StudentPageTwo,
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.path == "/") {
    next();
  } else {
    if (sessionStorage.getItem("user")) {
      next();
    } else {
      alert("未登录，请先登录");
      next("/");
    }
  }
});
export default router;
