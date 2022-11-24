<script setup>
import { RouterLink } from "vue-router";
import { ref, watch } from "vue";
import { useWindowsWidth } from "../../assets/js/useWindowsWidth";
import { useUserStore } from "@/stores/UserStore.js";
import { useRoute } from "vue-router";
import Router from "@/router";

// images
import ArrDark from "@/assets/img/down-arrow-dark.svg";
import downArrow from "@/assets/img/down-arrow.svg";
import DownArrWhite from "@/assets/img/down-arrow-white.svg";
import { computed } from "@vue/reactivity";

const userStore = useUserStore();
const route = useRoute();

const articleNo = ref(1);
const pgNo = ref(1);

const props = defineProps({
    action: {
        type: Object,
        route: String,
        color: String,
        label: String,
        default: () => ({
            route: "https://www.creative-tim.com/product/vue-material-kit",
            color: "bg-gradient-success",
            label: "Free Download",
        }),
    },
    transparent: {
        type: Boolean,
        default: false,
    },
    light: {
        type: Boolean,
        default: false,
    },
    dark: {
        type: Boolean,
        default: false,
    },
    sticky: {
        type: Boolean,
        default: false,
    },
    darkText: {
        type: Boolean,
        default: false,
    },
});

// set arrow  color
function getArrowColor() {
    if (props.transparent && textDark.value) {
        return ArrDark;
    } else if (props.transparent) {
        return DownArrWhite;
    } else {
        return ArrDark;
    }
}

// set text color
const getTextColor = () => {
    let color;
    if (props.transparent && textDark.value) {
        color = "text-dark";
    } else if (props.transparent) {
        color = "text-white";
    } else {
        color = "text-dark";
    }

    return color;
};

// set nav color on mobile && desktop

let textDark = ref(props.darkText);
const { type } = useWindowsWidth();

if (type.value === "mobile") {
    textDark.value = true;
} else if (type.value === "desktop" && textDark.value == false) {
    textDark.value = false;
}

watch(
    () => type.value,
    (newValue) => {
        if (newValue === "mobile") {
            textDark.value = true;
        } else {
            textDark.value = false;
        }
    }
);

const userInfo = computed(() => userStore.userInfo);
async function onClickLogout() {
    // this.SET_IS_LOGIN(false);
    // this.SET_USER_INFO(null);

    //vuex actions에서 userLogout 실행(Backend에 저장 된 리프레시 토큰 없애기
    //+ satate에 isLogin, userInfo 정보 변경)
    // this.$store.dispatch("userLogout", this.userInfo.userid);
    await userStore.userLogout(userInfo.userId);
    if (route.path != "/") Router.push({ name: "home" });
}
</script>
<template>
    <nav
        class="navbar navbar-expand-lg top-0"
        :class="{
            'z-index-3 w-100 shadow-none navbar-transparent position-absolute my-3': props.transparent,
            'my-3 blur border-radius-lg z-index-3 py-2 shadow py-2 start-0 end-0 mx-4 position-absolute mt-4':
                props.sticky,
            'navbar-light bg-white py-3': props.light,
            ' navbar-dark bg-gradient-dark z-index-3 py-3': props.dark,
        }"
    >
        <div :class="props.transparent || props.light || props.dark ? 'container' : 'container-fluid px-0'">
            <font-awesome-icon class="m-2" icon="fa-solid fa-house" />
            <RouterLink
                class="navbar-brand d-none d-md-block"
                :class="[
                    (props.transparent && textDark.value) || !props.transparent
                        ? 'text-dark font-weight-bolder ms-sm-3'
                        : 'text-white font-weight-bolder m  s-sm-3',
                ]"
                to="/"
                rel="tooltip"
                title="Designed and Coded by Creative Tim"
                data-placement="bottom"
            >
                WHERE IS MY HOME
            </RouterLink>
            <RouterLink
                class="navbar-brand d-none d-md-block"
                :class="[
                    (props.transparent && textDark.value) || !props.transparent
                        ? 'text-dark font-weight-bolder ms-sm-3'
                        : 'text-white font-weight-bolder ms-sm-3',
                ]"
                :to="{ name: 'noticelist', params: { articleno: articleNo, pgNo: pgNo } }"
                rel="tooltip"
                title="Designed and Coded by Creative Tim"
                data-placement="bottom"
            >
                공지사항
            </RouterLink>

            <RouterLink
                class="navbar-brand d-none d-md-block"
                :class="[
                    (props.transparent && textDark.value) || !props.transparent
                        ? 'text-dark font-weight-bolder ms-sm-3'
                        : 'text-white font-weight-bolder ms-sm-3',
                ]"
                :to="{ name: 'qnalist', params: { articleno: articleNo, pgNo: pgNo } }"
                rel="tooltip"
                title="Designed and Coded by Creative Tim"
                data-placement="bottom"
            >
                Q & A
            </RouterLink>
            <!-- <RouterLink
        class="navbar-brand d-block d-md-none"
        :class="props.transparent || props.dark ? 'text-white' : 'font-weight-bolder ms-sm-3'"
        to="/"
        rel="tooltip"
        title="Designed and Coded by Creative Tim"
        data-placement="bottom"
      >
        Material Design
      </RouterLink>
      <a
        href="https://www.creative-tim.com/product/vue-material-kit-pro"
        class="btn btn-sm bg-gradient-success mb-0 ms-auto d-lg-none d-block"
        >Buy Now</a
      >
      <button
        class="navbar-toggler shadow-none ms-2"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navigation"
        aria-controls="navigation"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon mt-2">
          <span class="navbar-toggler-bar bar1"></span>
          <span class="navbar-toggler-bar bar2"></span>
          <span class="navbar-toggler-bar bar3"></span>
        </span>
      </button> -->
            <div class="collapse navbar-collapse w-100 pt-3 pb-2 py-lg-0" id="navigation">
                <ul class="navbar-nav navbar-nav-hover ms-auto">
                    <li class="nav-item dropdown dropdown-hover mx-2" v-if="userInfo.userId">
                        <button
                            class="navbar-brand d-none d-md-block"
                            style="background-color: transparent; border: 0; outline: 0"
                            :class="[
                                (props.transparent && textDark.value) || !props.transparent
                                    ? 'text-dark font-weight-bolder ms-sm-3'
                                    : 'text-white font-weight-bolder ms-sm-3',
                            ]"
                            @click="onClickLogout"
                            rel="tooltip"
                            title="Designed and Coded by Creative Tim"
                            data-placement="bottom"
                        >
                            로그아웃
                        </button>
                    </li>
                    <li class="nav-item dropdown dropdown-hover mx-2" v-if="!userInfo.userId">
                        <RouterLink
                            class="navbar-brand d-none d-md-block"
                            :class="[
                                (props.transparent && textDark.value) || !props.transparent
                                    ? 'text-dark font-weight-bolder ms-sm-3'
                                    : 'text-white font-weight-bolder ms-sm-3',
                            ]"
                            to="/user/login"
                            rel="tooltip"
                            title="Designed and Coded by Creative Tim"
                            data-placement="bottom"
                        >
                            로그인
                        </RouterLink>
                    </li>
                    <li class="nav-item dropdown dropdown-hover mx-2" v-if="!userInfo.userId">
                        <RouterLink
                            class="navbar-brand d-none d-md-block"
                            :class="[
                                (props.transparent && textDark.value) || !props.transparent
                                    ? 'text-dark font-weight-bolder ms-sm-3'
                                    : 'text-white font-weight-bolder ms-sm-3',
                            ]"
                            to="/user/regist"
                            rel="tooltip"
                            title="Designed and Coded by Creative Tim"
                            data-placement="bottom"
                        >
                            회원가입
                        </RouterLink>
                    </li>
                    <li class="nav-item dropdown dropdown-hover mx-2" v-if="userInfo.userId">
                        <a
                            role="button"
                            class="nav-link ps-2 d-flex cursor-pointer align-items-center"
                            :class="getTextColor()"
                            id="dropdownMenuPages"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <i class="fa fa-regular fa-user text-md mx-1" :class="getTextColor()"></i>
                            {{ userInfo.userName }} 님
                            <img :src="getArrowColor()" alt="down-arrow" class="arrow ms-2 d-lg-block d-none" />
                            <img :src="getArrowColor()" alt="down-arrow" class="arrow ms-1 d-lg-none d-block ms-auto" />
                        </a>
                        <div
                            class="dropdown-menu dropdown-menu-animation ms-n3 dropdown-md p-3 border-radius-xl mt-0 mt-lg-3"
                            aria-labelledby="dropdownMenuPages"
                        >
                            <div class="row d-none d-lg-block">
                                <div class="col-12 px-4 py-2">
                                    <div class="row">
                                        <div class="position-relative">
                                            <div
                                                class="dropdown-header text-dark font-weight-bolder d-flex align-items-center px-1"
                                            >
                                                Hello
                                            </div>

                                            <RouterLink to="/user/userinfo" class="dropdown-item border-radius-md">
                                                <span>마이페이지</span>
                                            </RouterLink>
                                            <RouterLink to="/" class="dropdown-item border-radius-md">
                                                <span>Contact Us</span>
                                            </RouterLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <!-- <ul class="navbar-nav d-lg-block d-none">
          <li class="nav-item">
            <a
              :href="action.route"
              class="btn btn-sm mb-0"
              :class="action.color"
              onclick="smoothToPricing('pricing-soft-ui')"
              >{{ action.label }}</a
            >
          </li>
        </ul> -->
            </div>
        </div>
    </nav>
    <!-- End Navbar -->
</template>
