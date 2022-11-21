<script setup>
import { onMounted, onUpdated, reactive } from "vue";

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
import { useRoute } from "vue-router";
import { getNotice, modifyNotice } from "@/api/notice";

// console.log();

const route = useRoute();
let paramArticleno = route.params.articleno;
let paramPgno = route.params.pgno;
console.log("NoticeModify paramArticleno : " + paramArticleno);
console.log("NoticeModify paramPgno : " + paramPgno);

getNotice(
    paramArticleno,
    ({ data }) => {
        article.articleno = data.articleNo;
        article.userid = data.userId;
        article.username = data.userName;
        article.subject = data.subject;
        article.content = data.content;
        article.hit = data.hit;
        article.registerTime = data.registerTime;
        console.log("NoticeModify getNotice article : \\>");
        console.log(article);
    },
    (error) => {
        console.log(error);
    }
);

onMounted(() => {
    setMaterialInput();
});

const article = reactive({
    articleno: 0,
    userid: "관리자 id",
    username: "관리자 이름",
    subject: "default subject",
    content: "default content",
    hit: 0,
    registerTime: null,
});

console.log("NoticeModify article : \\>");
console.log(article);

function modify() {
    let params = {
        articleNo: article.articleno,
        userId: article.userid,
        userName: null,
        subject: article.subject,
        content: article.content,
        hit: null,
        registerTime: null,
    };
    alert("1NoticeModify modify article.subject : " + JSON.stringify(article));
    alert("2NoticeModify modify params.subject : " + JSON.stringify(params));
    modifyNotice(
        params,
        ({ data }) => {
            alert("4NoticeModify modifyNotice: " + data);
            let msg = "수정 처리시 문제가 발생했습니다.";
            if (data === "success") {
                msg = "수정이 완료되었습니다.";
            }
            alert(msg);
            // 현재 route를 /list로 변경.
            // moveList();
            // movedetail();
        },
        (error) => {
            console.log("no");
            console.log(error);
        }
    );
}

function movedetail() {
    Router.push({ name: "noticedetail", params: { articleno: article.articleno, pgno: paramPgno } });
}

function movelist() {
    Router.push("/notice");
}

function test() {
    console.log("article.subject: " + article.subject);
    // console.log("params.subject: " + params.subject);
}
</script>
<template>
    <Header>
        <div class="page-header min-height-400" :style="{ backgroundImage: `url(${backgroundImage})` }" loading="lazy">
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
                                                    placeholder="이름을 입력하세요"
                                                    v-model="article.userid"
                                                    isDisabled
                                                />
                                            </div>
                                            <div class="text-lg mb-0">
                                                <p>Content</p>
                                                <MaterialTextArea
                                                    class="input-group-static mb-4"
                                                    placeholder="내용을 입력하세요"
                                                    :rows="7"
                                                    v-model="article.content"
                                                ></MaterialTextArea>
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
                                                    @click="modify"
                                                    >수정</MaterialButton
                                                >
                                                <MaterialButton
                                                    class="m-1 mb-0"
                                                    variant="outline"
                                                    color="danger"
                                                    @click="movedetail"
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
</template>
