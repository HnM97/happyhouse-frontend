<script setup>
import NoticeListItem from "@/views/Notice/Components/NoticeListItem.vue";
import { reactive } from "vue";
import { useNoticeStore } from "@/stores/NoticeStore.js";

const noticeStore = useNoticeStore();

const headers = ["글번호", "제목", "작성자", "작성일", "조회수"];
const articles = reactive([]);
list();

let param = {
    pg: 1,
    spp: 20,
    start: null,
    key: null,
    word: null,
};

async function list() {
    await noticeStore.writeNoticeContent(param);
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
                    :pgno="param.pgno"
                    :index="articles.length - index"
                />
            </tr>
        </tbody>
    </table>
</template>
