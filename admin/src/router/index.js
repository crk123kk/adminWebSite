

import Login from '@/views/Login.vue'
import MainBox from '@/views/MainBox.vue'
import { createRouter, createWebHistory } from 'vue-router'
import configRoutes from './config'
import store from '@/store'


const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/mainBox',
        name: 'mainBox',
        component: MainBox
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

const checkPermission = (item) => {
    // 如果路由本身需要判断是否是管理员权限才能看到的，那么需要判断用户身份
    if (item.requireAdmin) {
        return store.state.userInfo.role === 1
    }
    // 如果是通用路由，直接返回
    return true
}

const configRouters = () => {

    // 因为之前为了避免路由无限嵌套删除了 mainBox 路由，这时候要添加回来

    if (!router.hasRoute('mainBox')) {
        router.addRoute({
            path: '/mainBox',
            name: 'mainBox',
            component: MainBox
        })
    }

    configRoutes.forEach((item) => {
        checkPermission(item) && router.addRoute('mainBox', item)
    })
    store.commit('changeGetterRouter', true)
}



router.beforeEach((to, from, next) => {

    if (to.path === '/login') {
        next()
    } else {
        let token = localStorage.getItem('token')
        if (!token) {
            next('/login')
        } else {
            // 判断是否是第一次配置路由，避免重复添加路由并陷入跳转死循环（因为如果没有这个，会不断的进入守卫，然后添加路由，跳转，在进入守卫）
            if (!store.state.isGetterRouter) {
                // 删除所有嵌套路由，避免出现路由不断嵌套递增
                router.removeRoute('mainBox')
                // 动态添加路由
                configRouters()
                // configRouters 只是添加了路由，还没有跳转，所以这时候判断完了，我们需要人为再根据新的路由跳转
                next({
                    path: to.fullPath
                })
            } else {
                next()
            }
        }
    }

})

export default router