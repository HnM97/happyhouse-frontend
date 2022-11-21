<script setup>
import { onMounted, onUpdated, reactive, ref } from "vue";

//example components
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import FooterDefault from "@/examples/footers/FooterDefault.vue";

import Header from "@/examples/Header.vue";

import MaterialAvatar from "@/components/MaterialAvatar.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialTextArea from "@/components/MaterialTextArea.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";
import backgroundImage from "@/assets/img/background.jpg";

import regist from "@/assets/img/regist.jpg";

import Router from "@/router";

import { userStore } from "@/stores/UserStore.js";
import { computed } from "@vue/reactivity";
import { writeNotice } from "@/api/notice";

const userid = ref(null);
const subject = ref(null);
const content = ref(null);

onMounted(() => {
    setMaterialInput();
});

const userinfo = computed(() => userStore.userInfo);
// console.log(userinfo);

const article = reactive({
    articleno: 0,
    userid: "ssafy",
    subject: "",
    content: "",
});
console.log("NoticeRegist article.subject: " + article.subject);

const isUserid = ref(false);

function movelist() {
    Router.push("/notice");
}

function onSubmit(event) {
    event.preventDefault();
    alert("1NoticeRegist onSubmit: " + JSON.stringify(article));
    let err = true;
    let msg = "";
    !article.userid && ((msg = "작성자 입력해주세요"), (err = false), userid.focus());
    err && !article.subject && ((msg = "제목 입력해주세요"), (err = false), subject.focus());
    err && !article.content && ((msg = "내용 입력해주세요"), (err = false), content.focus());

    if (!err) alert(msg);
    else registNotice();
}

async function registNotice() {
    article.userid = "ssafy";
    let param = {
        userId: article.userid,
        subject: article.subject,
        content: article.content,
    };

    console.log("param : " + JSON.stringify(param));
    alert("2NoticeRegist registNotice: " + JSON.stringify(param));
    await writeNotice(
        param,
        ({ data }) => {
            console.log("4NoticeRegist writeNotice: " + data);
            alert("4NoticeRegist writeNotice: " + data);
            // let msg = "등록 처리시 문제가 발생했습니다.";
            // if (data === "success") {
            //     msg = "등록이 완료되었습니다.";
            // }
            // alert(msg);
            // this.moveList();
        },
        (error) => {
            alert(error);
            console.log(error);
        }
    );
}

function onReset(event) {
    event.preventDefault();
    article.articleno = 0;
    article.subject = "";
    article.content = "";
    // this.moveList();
}
function test() {
    console.log("NoticeRegist article.subject: " + article.subject);
    console.log("NoticeRegist article.content: " + article.content);
}
</script>

<template>
    <!-- <div v-if="userinfo"> -->
    <div>
        <Header>
            <div
                class="page-header min-height-400"
                :style="{ backgroundImage: `url(${backgroundImage})` }"
                loading="lazy"
            >
                <span class="mask bg-gradient-dark opacity-6"></span>
            </div>
        </Header>

        <div class="card card-body shadow-blur mx-md-8 mt-n10 mb-6">
            <section class="py-sm-1 position-relative">
                <div class="container">
                    <div class="row">
                        <div class="col-3 mx-auto d-flex justify-content-center pt-5">
                            <MaterialAvatar
                                size="xxl"
                                class="shadow-xl position-relative z-index-2 m-4"
                                :image="regist"
                                alt="Avatar"
                            />
                        </div>
                        <div class="col-9 mx-auto d-flex justify-content-center">
                            <div class="row py-1">
                                <div class="col-lg-12 col-md-12 z-index-2 position-relative px-md-2 px-sm-5 mx-auto">
                                    <form class="p-3" id="contact-form" method="post">
                                        <div class="card-body pt-1 px-0">
                                            <div class="row">
                                                <div class="align-items-center my-4 mt-5">
                                                    <MaterialInput
                                                        class="input-group-static mb-4"
                                                        label="Subject"
                                                        type="text"
                                                        ref="subject"
                                                        placeholder="제목을 입력하세요"
                                                        v-model="article.subject"
                                                        @keyup="test"
                                                    />
                                                </div>
                                                <div class="my-2 mb-4">
                                                    <MaterialInput
                                                        class="input-group-static mb-4"
                                                        label="Name"
                                                        type="text"
                                                        ref="userid"
                                                        v-model="userinfo"
                                                        isDisabled
                                                    />
                                                </div>
                                                <div class="text-lg mb-0">
                                                    <MaterialTextArea
                                                        class="input-group-static mb-4"
                                                        placeholder="내용을 입력하세요"
                                                        :rows="6"
                                                        ref="content"
                                                        v-model="article.content"
                                                        @keyup="test"
                                                        >Notice content</MaterialTextArea
                                                    >
                                                </div>
                                            </div>
                                            <div class="row my-2 mt-4">
                                                <div class="col d-flex justify-content-end">
                                                    <MaterialButton
                                                        class="m-1 mb-0"
                                                        variant="outline"
                                                        color="info"
                                                        @click="movelist"
                                                        >목록</MaterialButton
                                                    >
                                                    <MaterialButton
                                                        class="m-1 mb-0"
                                                        variant="outline"
                                                        color="success"
                                                        @click="registNotice"
                                                        >작성</MaterialButton
                                                    >
                                                    <MaterialButton
                                                        class="m-1 mb-0"
                                                        variant="outline"
                                                        color="danger"
                                                        @click="onReset"
                                                        >취소</MaterialButton
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
