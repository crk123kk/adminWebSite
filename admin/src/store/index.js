import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
    state: {
        isGetterRouter: false,
        isCollapse: true,
        userInfo: {}
    },
    mutations: {
        // 判断是否是第一次获取路由
        changeGetterRouter(state, payload) {
            state.isGetterRouter = payload
        },

        // 控制侧边栏的展开和关闭
        changeCollapsed(state) {
            state.isCollapse = !state.isCollapse
        },

        changeUserInfo(state, payload) {
            state.userInfo = {
                ...state.userInfo,
                ...payload
            }
        },
        clearUserInfo(state) {
            state.userInfo = {}
        }


    },
    actions: {},
    modules: {},
    plugins: [createPersistedState({
        // 控制持久化的字段
        paths: ["isCollapse", 'userInfo'],

    })]
});