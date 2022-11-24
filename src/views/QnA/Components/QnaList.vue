<script setup>
import { onMounted } from "vue";

//pagination
import MaterialPagination from "@/components/MaterialPagination.vue";
import MaterialPaginationItem from "@/components/MaterialPaginationItem.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";
import backgroundImage from "@/assets/img/background.jpg";
import MaterialButton from "@/components/MaterialButton.vue";

import Router from "@/router";
import { useRoute } from "vue-router";
import QnaListItem from "@/views/Qna/Components/QnaListItem.vue";
import { reactive } from "vue";
import { listQna } from "@/api/qna";

const headers = ["글번호", "제목", "작성자", "작성일", "조회수"];
const articles = reactive([]);
const pgNaviList = reactive([]);

const route = useRoute();
let paramArticleno = route.params.articleno;

const param = reactive({
    pgNo: 1,
    spp: 10,
    start: 0,
    key: "",
    word: "",
});
param.pgNo = route.params.pgNo;

const naviData = reactive({
    currentPage: 1,
    startRange: true,
    endRange: true,
    startPage: 1,
    endPage: 5,
    naviSize: 5,
    totalPageCount: 5,
    totalCount: 50,
});

initQna();

function initQna() {
    listQna(
        param,
        ({ data }) => {
            naviData.currentPage = data.currentPage;
            naviData.startRange = data.startRange;
            naviData.endRange = data.endRange;
            naviData.startPage = data.startPage;
            naviData.endPage = data.endPage;
            naviData.naviSize = data.naviSize;
            naviData.totalPageCount = data.totalPageCount;
            naviData.totalCount = data.totalCount;

            articles.length = 0;
            for (let index = 0; index < data.list.length; index++) {
                articles.push(data.list[index]);
            }

            pgNaviList.length = 0;
            for (let index = naviData.startPage; index <= naviData.endPage; index++) {
                pgNaviList.push(index);
            }
        },
        (error) => {
            console.log(error);
        }
    );
}

function changePage(pgNaviNo) {
    param.pgNo = pgNaviNo;
    initQna();
}

onMounted(() => {
    setMaterialInput();
});

function moveQnaRegist() {
    Router.replace("/qna/regist");
}
</script>
<template>
    <section>
        <div class="page-header min-vh-100" :style="{ backgroundImage: `url(${backgroundImage})` }">
            <span class="mask bg-gradient-dark opacity-6"></span>
            <div class="container">
                <div class="row">
                    <div class="card card-body shadow-blur mx-md-4 mt-11 mb-6">
                        <!-- <div class="card d-flex bg-opacity-100 justify-content-center shadow-lg my-sm-0 my-sm-6 mt-8 mb-5"> -->
                        <div class="card-header p-0 position-relative mt-n5 mx-3 z-index-2 bg-transparent">
                            <div class="bg-gradient-dark shadow-dark border-radius-lg p-3">
                                <h3 class="text-white text-success mb-0">Q & A</h3>
                            </div>
                        </div>
                        <div class="card-body">
                            <table class="table align-items-center my-4 mt-2">
                                <thead>
                                    <tr>
                                        <th
                                            v-for="(header, index) in headers"
                                            :key="header"
                                            class="text-center text-secondary text-md font-weight-bolder opacity-7 my-4"
                                        >
                                            {{ header }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="({ articleNo, subject, userId, registerTime, hit }, index) of articles"
                                        :key="index"
                                    >
                                        <QnaListItem
                                            :articleNo="articleNo"
                                            :subject="subject"
                                            :userId="userId"
                                            :registerTime="registerTime"
                                            :hit="hit"
                                            :pgNo="param.pgNo"
                                            :index="articles.length - index"
                                        />
                                    </tr>
                                </tbody>
                            </table>

                            <div class="d-flex justify-content-end">
                                <MaterialButton
                                    size="sm"
                                    class="my-2 me-5"
                                    variant="outline"
                                    color="dark"
                                    @click="moveQnaRegist"
                                    ><div class="d-flex align-items-center">
                                        <i class="fa fa-light fa-pen me-2"></i>
                                        글작성
                                    </div>
                                </MaterialButton>
                            </div>
                            <section class="py-4 pb-2">
                                <div class="container">
                                    <div class="row justify-space-between py-2">
                                        <div class="col-lg-4 mx-auto d-flex justify-content-center">
                                            <MaterialPagination>
                                                <MaterialPaginationItem
                                                    prev
                                                    @click="
                                                        changePage(naviData.startRange ? 1 : naviData.startPage - 1)
                                                    "
                                                />
                                                <div v-for="pgNaviNo of pgNaviList" key="pgNaviNo">
                                                    <MaterialPaginationItem
                                                        :value="pgNaviNo"
                                                        :label="pgNaviNo"
                                                        :pgNaviNo="pgNaviNo"
                                                        :currentPage="naviData.currentPage"
                                                        @click="changePage(pgNaviNo)"
                                                    />
                                                </div>

                                                <MaterialPaginationItem
                                                    next
                                                    @click="
                                                        changePage(
                                                            naviData.endRange ? naviData.endPage : naviData.endPage + 1
                                                        )
                                                    "
                                                />
                                            </MaterialPagination>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
