import Center from "@/views/center/Center.vue";
import Home from "@/views/home/Home.vue";
import NewsAdd from "@/views/newsManage/NewsAdd.vue";
import NewsEdit from "@/views/newsManage/NewsEdit.vue";
import NewsList from "@/views/newsManage/NewsList.vue";
import NotFound from "@/views/notFound/NotFound.vue";
import ProductAdd from "@/views/productManage/ProductAdd.vue";
import ProductEdit from "@/views/productManage/ProductEdit.vue";
import ProductList from "@/views/productManage/ProductList.vue";
import UserAdd from "@/views/userManage/UserAdd.vue";
import UserList from "@/views/userManage/UserList.vue";


const routes = [
    {
        path: '/index',
        component: Home
    },
    {
        path: '/center',
        component: Center
    },
    {
        path: '/user-manage/userAdd',
        component: UserAdd,
        requireAdmin: true,
    },
    {
        path: '/user-manage/userList',
        component: UserList,
        requireAdmin: true,
    },
    {
        path: '/news-manage/newsAdd',
        component: NewsAdd
    },
    {
        path: '/news-manage/newsEdit/:id',
        component: NewsEdit
    },
    {
        path: '/news-manage/newsList',
        component: NewsList
    },
    {
        path: '/product-manage/productAdd',
        component: ProductAdd
    },
    {
        path: '/product-manage/productEdit/:id',
        component: ProductEdit
    },
    {
        path: '/product-manage/productList',
        component: ProductList
    },
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: NotFound


    }
]

export default routes