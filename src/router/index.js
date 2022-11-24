import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/Home/HomeView.vue";
import NoticeView from "@/views/Notice/NoticeView.vue";
import NoticeList from "@/views/Notice/Components/NoticeList.vue";
import NoticeRegist from "@/views/Notice/Components/NoticeRegist.vue";
import NoticeDetail from "@/views/Notice/Components/NoticeDetail.vue";
import NoticeModify from "@/views/Notice/Components/NoticeModify.vue";

import UserView from "@/views/User/UserView.vue";
import UserRegist from "@/views/User/Components/UserRegist.vue";
import UserLogin from "@/views/User/Components/UserLogin.vue";
import UserInfo from "@/views/User/Components/UserInfo.vue";
import UserModify from "@/views/User/Components/UserModify.vue";

import MapView from "@/views/Map/MapView.vue";

import { useUserStore } from "@/stores/UserStore.js";
import Router from "@/router";

const onlyAuthUser = async (to, from, next) => {
    const userStore = useUserStore();
    let token = sessionStorage.getItem("access-token");
    // console.log("로그인 처리 전", userStore.userInfo, token);

    if (userStore.userInfo != null && token) {
        // console.log("토큰 유효성 체크하러 가자!!!!");
        await userStore.getUserInfo(token);
    }
    if (!userStore.isValidToken || userStore.userInfo === null) {
        alert("로그인이 필요한 페이지입니다");
        // next({ name: "login" });
        Router.push({ name: "login" });
    } else {
        // console.log("로그인 했다 -!");
        next();
    }
};

const onlyAdmin = async (to, from, next) => {
    const userStore = useUserStore();
    if (userStore.userInfo.userId === "관리자") {
        next();
    } else {
        alert("관리자만 접근이 가능합니다");
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
            redirect: "/notice/list/:articleno/:pgNo",
            children: [
                {
                    path: "list/:articleno/:pgNo",
                    name: "noticelist",
                    component: NoticeList,
                },
                {
                    path: "regist",
                    name: "noticeregist",
                    beforeEnter: onlyAdmin,
                    component: NoticeRegist,
                },
                {
                    path: "detail/:articleno/:pgNo",
                    name: "noticedetail",
                    beforeEnter: onlyAuthUser,
                    component: NoticeDetail,
                },
                {
                    path: "modify/:articleno/:pgNo",
                    name: "noticemodify",
                    beforeEnter: onlyAdmin,
                    component: NoticeModify,
                },
            ],
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
                    beforeEnter: onlyAuthUser,
                    component: UserInfo,
                },
                {
                    path: "modify",
                    name: "modify",
                    beforeEnter: onlyAuthUser,
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
