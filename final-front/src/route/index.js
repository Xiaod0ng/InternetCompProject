import {
    createRouter,
    createWebHashHistory
} from "vue-router";

const login = () => import("../views/Login.vue")
const signup = () => import("../views/Signup.vue")
const home = () => import("../views/Home.vue")

const routes = [{
        path: "/",
        redirect: "/login"
    },
    {
        path: "/login",
        name: "login",
        component: login
    },
    {
        path: "/signup",
        name: "signup",
        component: signup
    },
    {
        path: "/home",
        name: "home",
        component: home
    },
]


export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})