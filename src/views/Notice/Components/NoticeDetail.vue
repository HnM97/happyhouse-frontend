<script setup>
import { onMounted, reactive, computed } from "vue";

//example components
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import FooterDefault from "@/examples/footers/FooterDefault.vue";

import Header from "@/examples/Header.vue";

import MaterialAvatar from "@/components/MaterialAvatar.vue";
import MaterialButton from "@/components/MaterialButton.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";
import backgroundImage from "@/assets/img/background.jpg";

import notice from "@/assets/img/notice.jpg";

import Router from "@/router";
import { useRoute } from "vue-router";
import { getNotice, deleteNotice } from "@/api/notice";
import { useNoticeStore } from "@/stores/NoticeStore.js";
import { useUserStore } from "@/stores/UserStore.js";

const route = useRoute();
const noticeStore = useNoticeStore();
const userStore = useUserStore();

let paramArticleno = route.params.articleno;
let paramPgno = route.params.pgno;

getNotice(
    paramArticleno,
    ({ data }) => {
        article.articleno = data.articleNo;
        article.userid = data.userId;
        article.subject = data.subject;
        article.content = data.content;
        article.hit = data.hit;
        article.registerTime = data.registerTime;
        noticeStore.setNotice(article);
        noticeStore.setPgno(paramPgno);
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
    userName: "관리자 이름",
    subject: "default subject",
    content: "default content",
    hit: 0,
    registerTime: null,
});

const message = computed(() => {
    if (article.content) {
        return article.content.split("/n").join("<br>");
    }
});

function movelist() {
    Router.push("/notice");
}

function moveModifyNotice() {
    Router.replace({
        name: "noticemodify",
        params: {
            articleno: article.articleno,
            pgno: paramPgno,
        },
    });
    //   this.$router.push({ path: `/board/modify/${this.article.articleno}` });
}
function deleteThisNotice() {
    if (userStore.userInfo.userId !== "관리자") {
        alert("관리자만 접근이 가능합니다");
        return;
    }
    if (confirm("글을 삭제하시겠습니까?")) {
        const param = { articleno: paramArticleno, pgno: paramPgno };
        deleteNotice(
            param,
            ({ data }) => {
                let msg = "삭제 처리시 문제가 발생했습니다.";
                if (data === "success") {
                    msg = "삭제가 완료되었습니다.";
                }
                alert(msg);
                Router.push({ name: "noticelist" });
            },
            (error) => {
                console.log(error);
            }
        );
    }
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
                            :image="notice"
                            alt="Avatar"
                        />
                    </div>
                    <div class="col-9 mx-auto d-flex justify-content-center">
                        <div class="row py-1 w-100">
                            <div class="col-lg-10 col-md-10 z-index-2 position-relative px-md-2 px-sm-5 mx-auto">
                                <div class="align-items-center my-4 mt-5">
                                    <h3 class="">
                                        <!-- subject -->
                                        {{ article.subject }}
                                    </h3>
                                </div>
                                <div class="row mt-2 justify-content-between">
                                    <div class="col-4 d-flex justify-content-start">
                                        <span class="me-2">작성자</span>
                                        <span class="h6">
                                            <!-- 김싸피 -->
                                            {{ article.userid }}
                                        </span>
                                    </div>
                                    <div class="col-3 d-flex justify-content-end">
                                        <span class="me-2">조회수</span>
                                        <span class="h6">
                                            <!-- 7 -->
                                            {{ article.hit }}
                                        </span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col d-flex justify-content-start">
                                        <span class="me-2">작성일</span>
                                        <span>
                                            <!-- 2022-11-19 -->
                                            {{ article.registerTime }}
                                        </span>
                                    </div>
                                </div>
                                <p class="text-lg my-6">
                                    <!-- 공지사항 내용입니다 공지사항 내용입니다 공지사항 내용입니다 공지사항 내용입니다
                                    공지사항 내용입니다 공지사항 내용입니다 공지사항 내용입니다 공지사항 내용입니다
                                    공지사항 내용입니다 공지사항 내용입니다 공지사항 내용입니다 공지사항 내용입니다
                                    공지사항 내용입니다 공지사항 내용입니다 공지사항 내용입니다 공지사항 내용입니다 -->
                                    {{ article.content }}
                                    <br />
                                </p>
                                <div class="row my-6">
                                    <div class="col d-flex justify-content-end">
                                        <MaterialButton
                                            class="m-1 mb-0"
                                            variant="outline"
                                            color="info"
                                            size="sm"
                                            @click="movelist"
                                            >목록</MaterialButton
                                        >
                                        <MaterialButton
                                            class="m-1 mb-0"
                                            variant="outline"
                                            color="success"
                                            size="sm"
                                            @click="moveModifyNotice"
                                            >수정</MaterialButton
                                        >
                                        <MaterialButton
                                            class="m-1 mb-0"
                                            variant="outline"
                                            color="danger"
                                            size="sm"
                                            @click="deleteThisNotice"
                                            >삭제</MaterialButton
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
