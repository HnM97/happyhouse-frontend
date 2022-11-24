<script setup>
import { onMounted, onUpdated, reactive, ref } from "vue";
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

import { useUserStore } from "@/stores/UserStore.js";
import { computed } from "@vue/reactivity";

const userStore = useUserStore();
const userInfo = userStore.userInfo;

const user = reactive({
    userName: userInfo.userName,
    userId: userInfo.userId,
    userPwd: "",
    userPwdCheck: "",
    email: userInfo.email,
});

onMounted(() => {
    setMaterialInput();
});

async function modify() {
    if (!user.userName) {
        alert("이름을 입력하세요");
        return;
    } else if (!user.userPwd) {
        alert("비밀번호를 입력하세요");
        return;
    } else if (!user.userPwdCheck) {
        alert("비밀번호 확인을 입력하세요");
        return;
    } else if (!user.email) {
        alert("이메일을 입력하세요");
        return;
    }

    if (user.userPwd !== user.userPwdCheck) {
        alert("비밀번호가 일치하지 않습니다");
        user.userPwd = "";
        user.userPwdCheck = "";
    } else {
        const emailsplit = user.email.split("@");
        const param = {
            userName: user.userName,
            userId: user.userId,
            userPwd: user.userPwd,
            emailId: emailsplit[0],
            emailDomain: emailsplit[1],
        };
        await userStore.modifyUserInfo(param);
        Router.push({ name: "userinfo" });
    }
}

function moveinfo() {
    Router.push({ name: "userinfo" });
}
</script>
<template>
    <div class="container my-auto">
        <div class="row">
            <div class="col-lg-4 col-md-8 col-12 mx-auto">
                <div class="card z-index-0 fadeIn3 fadeInBottom">
                    <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                        <div class="bg-gradient-dark shadow-dark border-radius-lg py-3 pe-1">
                            <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">회원 정보 수정</h4>
                        </div>
                    </div>
                    <div class="card-body">
                        <form role="form" class="text-start">
                            <div class="mb-1">NAME</div>
                            <MaterialInput
                                id="name"
                                v-model="user.userName"
                                class="input-group-outline mb-3"
                                :label="{ class: 'form-label' }"
                                type="text"
                            />
                            <div class="mb-1">ID</div>
                            <MaterialInput
                                id="id"
                                class="input-group-outline mb-3"
                                :label="{ text: `${user.userId}`, class: 'form-label' }"
                                type="text"
                                isDisabled
                            />
                            <div class="mb-1">PASSWORD</div>
                            <MaterialInput
                                id="password"
                                v-model="user.userPwd"
                                class="input-group-outline mb-3"
                                :label="{ class: 'form-label' }"
                                type="password"
                            />
                            <div class="mb-1">PASSWORD CHECK</div>
                            <MaterialInput
                                id="password-check"
                                v-model="user.userPwdCheck"
                                class="input-group-outline mb-3"
                                :label="{ class: 'form-label' }"
                                type="password"
                            />
                            <div class="mb-1">EMAIL</div>
                            <MaterialInput
                                id="email"
                                v-model="user.email"
                                class="input-group-outline mb-3"
                                :label="{ class: 'form-label' }"
                                type="email"
                            />

                            <div class="text-center row">
                                <div class="col d-flex">
                                    <MaterialButton
                                        class="m-1 my-4 mb-2"
                                        variant="gradient"
                                        color="dark"
                                        fullWidth
                                        @click.prevent="modify"
                                    >
                                        수정
                                    </MaterialButton>
                                    <MaterialButton
                                        class="m-1 my-4 mb-2"
                                        variant="gradient"
                                        color="dark"
                                        fullWidth
                                        @click.prevent="moveinfo"
                                    >
                                        취소
                                    </MaterialButton>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
