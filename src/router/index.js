import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Login from '@/components/Login'
import Main from '@/components/MainPage'
import Message from '@/components/MyMessage'
import TeacherPageOne from '@/components/TeacherPageOne'
import TeacherPageTwo from '@/components/TeacherPageTwo'

const router =  new Router({
    //mode:'history',
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login,
        },
        {
            path: '/main',
            name: 'Main',
            component: Main,
            children:[
                {
                path: 'message',
                name: 'Message',
                component: Message,
                },
                {
                    path: 'teacherone',
                    component: TeacherPageOne,
                },
                {
                    path: 'teachertwo',
                    component: TeacherPageTwo,
                },
            ]
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.path == '/') {
        next();
    } else {
        if (sessionStorage.getItem('user')) {
            next();
        } else {
            alert('未登录，请先登录');
            next('/');
        }
    }
})
export default router;