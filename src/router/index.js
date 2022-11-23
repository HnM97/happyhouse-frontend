import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/Home/HomeView.vue";
import NoticeView from "@/views/Notice/NoticeView.vue";
import NoticeTable from "@/views/Notice/Components/NoticeTable.vue";
import NoticeRegist from "@/views/Notice/Components/NoticeRegist.vue";
import NoticeDetail from "@/views/Notice/Components/NoticeDetail.vue";
import NoticeModify from "@/views/Notice/Components/NoticeModify.vue";

import UserView from "@/views/User/UserView.vue";
import UserRegist from "@/views/User/Components/UserRegist.vue";
import UserLogin from "@/views/User/Components/UserLogin.vue";
import UserInfo from "@/views/User/Components/UserInfo.vue";
import UserModify from "@/views/User/Components/UserModify.vue";

import MapView from "@/views/Map/MapView.vue";

import { userStore } from "@/stores/UserStore.js";
import Router from "@/router";

const onlyAuthUser = async (to, from, next) => {
  const store = userStore();
  let token = sessionStorage.getItem("access-token");
  console.log("로그인 처리 전", store.userInfo, token);

  if (store.userInfo != null && token) {
    console.log("토큰 유효성 체크하러 가자!!!!");
    await store.getUserInfo(token);
  }
  if (!store.isValidToken || store.userInfo === null) {
    alert("로그인이 필요한 페이지입니다");
    // next({ name: "login" });
    Router.push({ name: "login" });
  } else {
    console.log("로그인 했다 -!");
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
      redirect: "/notice/list",
      children: [
        {
          path: "/notice",
          name: "notice",
          component: NoticeView,
          redirect: "/notice/list",
          children: [
            {
              path: "list",
              name: "noticelist",
              component: NoticeTable,
            },
            {
              path: "regist",
              name: "noticeregist",
              beforeEnter: onlyAuthUser,
              component: NoticeRegist,
            },
            {
              path: "detail/:articleno/:pgno",
              name: "noticedetail",
              beforeEnter: onlyAuthUser,
              component: NoticeDetail,
            },
            {
              path: "modify/:articleno/:pgno",
              name: "noticemodify",
              beforeEnter: onlyAuthUser,
              component: NoticeModify,
            },
          ],
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
