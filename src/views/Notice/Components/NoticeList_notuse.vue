<script setup>
import NoticeListItem from "@/views/Notice/Components/NoticeListItem.vue";
import { onUnmounted, onUpdated, reactive } from "vue";
import { listNotice } from "@/api/notice";

const headers = ["글번호", "제목", "작성자", "작성일", "조회수"];
const articles = reactive([]);

const param = reactive({
    pgNo: 1,
    spp: 10,
    start: 0,
    key: "",
    word: "",
});

initNotice();

function initNotice() {
    listNotice(
        param,
        ({ data }) => {
            for (let index = 0; index < data.list.length; index++) {
                articles.push(data.list[index]);
            }
        },
        (error) => {
            console.log(error);
        }
    );
}
</script>
<template>
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
            <tr v-for="({ articleNo, subject, userId, registerTime, hit }, index) of articles" :key="index">
                <NoticeListItem
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
</template>
