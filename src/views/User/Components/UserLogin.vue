<script setup>
import { onMounted, reactive, computed } from "vue";
import { RouterLink } from "vue-router";
import Router from "@/router";

// example components
import DefaultNavbar from "@/examples/navbars/NavbarDefault.vue";
import Header from "@/examples/Header.vue";

//Vue Material Kit 2 components
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialSwitch from "@/components/MaterialSwitch.vue";
import MaterialButton from "@/components/MaterialButton.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";

import { userStore } from "@/stores/UserStore.js";

onMounted(() => {
    setMaterialInput();
});

const user = reactive({
    userid: null,
    userpwd: null,
});

const isLogin = computed(() => userStore.isLogin);
// const isLoginError = computed(() => userStore.isLoginError);
const userInfo = computed(() => userStore.userInfo);

async function login() {
    await userStore.userConfirm(user.value);
    let token = sessionStorage.getItem("access-token");
    console.log("1. confirm() token >> " + token);
    if (isLogin) {
        await userStore.getUserInfo(token);
        console.log("4. confirm() userInfo :: ", userInfo);
        Router.push({ name: "home" });
    }
}

// computed: {
//   ...mapState(memberStore, ["isLogin", "isLoginError", "userInfo"]),
// },

// methods: {
//   ...mapActions(memberStore, ["userConfirm", "getUserInfo"]),
//   async confirm() {
//     await this.userConfirm(this.user);
//     let token = sessionStorage.getItem("access-token");
//     // console.log("1. confirm() token >> " + token);
//     if (this.isLogin) {
//       await this.getUserInfo(token);
//       // console.log("4. confirm() userInfo :: ", this.userInfo);
//       this.$router.push({ name: "main" });
//     }
//   },
//   movePage() {
//     this.$router.push({ name: "join" });
//   },
// },
</script>
<template>
    <div class="container my-auto">
        <div class="row">
            <div class="col-lg-4 col-md-8 col-12 mx-auto">
                <div class="card z-index-0 fadeIn3 fadeInBottom">
                    <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                        <div class="bg-gradient-dark shadow-dark border-radius-lg py-3 pe-1">
                            <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">로그인</h4>
                        </div>
                    </div>
                    <div class="card-body">
                        <form role="form" class="text-start">
                            <MaterialInput
                                id="userid"
                                v-model="user.userid"
                                class="input-group-outline mb-3"
                                :label="{ text: '아이디', class: 'form-label' }"
                                type="text"
                            />
                            <MaterialInput
                                id="userpwd"
                                v-model="user.userpwd"
                                class="input-group-outline mb-3"
                                :label="{ text: '비밀번호', class: 'form-label' }"
                                type="password"
                            />
                            <MaterialSwitch
                                class="d-flex align-items-center mb-3"
                                id="rememberMe"
                                labelClass="mb-0 ms-3"
                                checked
                                >아이디 저장</MaterialSwitch
                            >

                            <div class="text-center">
                                <MaterialButton
                                    class="my-4 mb-2"
                                    variant="gradient"
                                    color="dark"
                                    fullWidth
                                    @click="login"
                                >
                                    로그인
                                </MaterialButton>
                            </div>
                            <p class="mt-4 text-sm text-center">
                                아직 회원이 아니세요 ? &nbsp;
                                <RouterLink class="text-info text-gradient font-weight-bold" to="regist" rel="tooltip">
                                    회원가입
                                </RouterLink>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
