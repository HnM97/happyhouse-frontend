<script setup>
import { onMounted } from "vue";
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

const user = {
    userId: userInfo.userId,
};

onMounted(() => {
    setMaterialInput();
});

function movehome() {
    Router.push({ name: "home" });
}

function modify() {
    Router.push("/user/modify");
}

async function deleteuser() {
    alert("정말 탈퇴하시겠습니까?");
    await userStore.deleteUserInfo(user.userId);
    Router.push({ name: "home" });
}
</script>

<template>
    <div class="container my-auto">
        <div class="row">
            <div class="col-lg-4 col-md-8 col-12 mx-auto">
                <div class="card z-index-0 fadeIn3 fadeInBottom">
                    <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                        <div class="bg-gradient-dark shadow-dark border-radius-lg py-3 pe-1">
                            <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">회원 정보 확인</h4>
                        </div>
                    </div>
                    <div class="card-body">
                        <form role="form" class="text-start">
                            <div class="mb-1">NAME</div>
                            <MaterialInput
                                id="name"
                                class="input-group-outline mb-3"
                                :label="{ text: `${userInfo.userName}`, class: 'form-label' }"
                                type="text"
                                isDisabled
                            />
                            <div class="mb-1">ID</div>
                            <MaterialInput
                                id="id"
                                class="input-group-outline mb-3"
                                :label="{ text: `${userInfo.userId}`, class: 'form-label' }"
                                type="text"
                                isDisabled
                            />
                            <!-- <div class="mb-1">PASSWORD</div> -->
                            <!-- <MaterialInput
                                id="password"
                                class="input-group-outline mb-3"
                                :label="{ text: `${userInfo.userPwd}`, class: 'form-label' }"
                                type="password"
                                isDisabled
                            /> -->
                            <div class="mb-1">EMAIL</div>
                            <MaterialInput
                                id="email"
                                class="input-group-outline mb-3"
                                :label="{ text: `${userInfo.email}`, class: 'form-label' }"
                                type="email"
                                isDisabled
                            />

                            <div class="text-center row">
                                <div class="col d-flex">
                                    <MaterialButton
                                        class="m-1 my-4 mb-2"
                                        variant="gradient"
                                        color="dark"
                                        fullWidth
                                        @click="movehome"
                                    >
                                        확인
                                    </MaterialButton>
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
                                        @click.prevent="deleteuser"
                                    >
                                        탈퇴
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
