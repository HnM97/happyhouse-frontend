<script setup>
import { onMounted, reactive } from "vue";
import { join } from "@/api/user";
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

onMounted(() => {
    setMaterialInput();
});

const user = reactive({
    userId: "",
    userName: "",
    userPwd: "",
    userPwdCheck: "",
    email: "",
});

async function onSubmit() {
    if (!user.userId) {
        alert("아이디를 입력하세요");
        return;
    } else if (!user.userName) {
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
            userId: user.userId,
            userName: user.userName,
            userPwd: user.userPwd,
            emailId: emailsplit[0],
            emailDomain: emailsplit[1],
        };
        await join(
            param,
            ({ data }) => {
                alert("회원가입이 완료되었습니다\n환영합니다!");
                Router.push({ name: "login" });
            },
            (error) => {
                alert("이미 가입된 정보이거나 잘못된 정보입니다\n다시 가입해주세요");
                user.userId = "";
                user.userName = "";
                user.userPwd = "";
                user.userPwdCheck = "";
                user.email = "";
                location.reload();
            }
        );
    }
}
</script>
<template>
    <div class="container my-auto">
        <div class="row">
            <div class="col-lg-4 col-md-8 col-12 mx-auto">
                <div class="card z-index-0 fadeIn3 fadeInBottom">
                    <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                        <div class="bg-gradient-dark shadow-dark border-radius-lg py-3 pe-1">
                            <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">회원가입</h4>
                        </div>
                    </div>
                    <div class="card-body">
                        <form role="form" class="text-start">
                            <MaterialInput
                                id="name"
                                v-model="user.userName"
                                class="input-group-outline mb-3"
                                :label="{ text: '이름', class: 'form-label' }"
                                type="text"
                            />
                            <MaterialInput
                                id="id"
                                v-model="user.userId"
                                class="input-group-outline mb-3"
                                :label="{ text: '아이디', class: 'form-label' }"
                                type="text"
                            />
                            <MaterialInput
                                id="password"
                                v-model="user.userPwd"
                                class="input-group-outline mb-3"
                                :label="{ text: '비밀번호', class: 'form-label' }"
                                type="password"
                            />
                            <MaterialInput
                                id="password-check"
                                v-model="user.userPwdCheck"
                                class="input-group-outline mb-3"
                                :label="{ text: '비밀번호 확인', class: 'form-label' }"
                                type="password"
                            />
                            <MaterialInput
                                id="email"
                                v-model="user.email"
                                class="input-group-outline my-3"
                                :label="{ text: '이메일', class: 'form-label' }"
                                type="email"
                            />

                            <div class="text-center">
                                <MaterialButton
                                    class="my-4 mb-2"
                                    variant="gradient"
                                    color="dark"
                                    fullWidth
                                    @click.prevent="onSubmit"
                                >
                                    회원가입
                                </MaterialButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
