import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/Home/HomeView.vue";
import NoticeView from "@/views/Notice/NoticeView.vue";
import NoticeDetailView from "@/views/Notice/NoticeDetail.vue";
import UserView from "@/views/User/UserView.vue";
import UserRegist from "@/views/User/Components/UserRegist.vue";
import UserLogin from "@/views/User/Components/UserLogin.vue";
import UserInfo from "@/views/User/Components/UserInfo.vue";
import UserModify from "@/views/User/Components/UserModify.vue";
import MapView from "@/views/Map/MapView.vue";

import { userStore } from "@/stores/UserStore.js";

const onlyAuthUser = async (to, from, next) => {
    // const checkUserInfo = store.getters["userStore/checkUserInfo"];
    // const checkToken = store.getters["userStore/checkToken"];
    let token = sessionStorage.getItem("access-token");
    // console.log("로그인 처리 전", checkUserInfo, token);
    console.log("로그인 처리 전", userStore.userInfo, token);

    // if (checkUserInfo != null && token) {
    if (userStore.userInfo != null && token) {
        console.log("토큰 유효성 체크하러 가자!!!!");
        await store.dispatch("userStore/getUserInfo", token);
    }
    if (!checkToken || checkUserInfo === null) {
        alert("로그인이 필요한 페이지입니다..");
        // next({ name: "login" });
        router.push({ name: "login" });
    } else {
        console.log("로그인 했다!!!!!!!!!!!!!.");
        next();
    }
};

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        /**
         * Notice
         */
        {
            path: "/notice",
            name: "notice",
            component: NoticeView,
        },
        {
            path: "/notice/:articleno",
            name: "noticedetail",
            component: NoticeDetailView,
        },
        /**
         * User
         */
        {
            path: "/user",
            name: "user",
            component: UserView,
            children: [
                {
                    path: "login",
                    name: "login",
                    component: UserLogin,
                },
                {
                    path: "regist",
                    name: "regist",
                    component: UserRegist,
                },
                {
                    path: "userinfo",
                    name: "userinfo",
                    // beforeEnter: onlyAuthUser,
                    component: UserInfo,
                },
                {
                    path: "modify",
                    name: "modify",
                    // beforeEnter: onlyAuthUser,
                    component: UserModify,
                },
            ],
        },

        /**
         * Map
         */
        {
            path: "/map",
            name: "map",
            component: MapView,
        },
    ],
});

export default router;
