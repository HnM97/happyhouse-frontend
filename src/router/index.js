import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home/HomeView.vue";
import NoticeView from "../views/Notice/NoticeView.vue";
import NoticeDetail from "@/components/Notice/NoticeDetail.vue";
import RegistView from "../views/User/Regist/RegistView.vue";
import LoginView from "../views/User/Login/LoginView.vue";

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
      component: NoticeDetail,
    },
    /**
     * User
     */
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/regist",
      name: "regist",
      component: RegistView,
    },
  ],
});

export default router;
