<script setup>
import { listNotice } from "@/api/notice";
import NoticeListItem from "@/views/Notice/Components/NoticeListItem.vue";
import { reactive } from "vue";

const headers = ["글번호", "제목", "작성자", "작성일", "조회수"];
// const rows = [
//     {
//         articleno: 1,
//         userid: "test",
//         subject: "testtesttest",
//         hit: 1,
//         registertime: "2022-11-16",
//     },
// ];

const articles = reactive([]);

let param = {
    pgno: 1,
    spp: 20,
    key: null,
    word: null,
};

listNotice(
    param,
    ({ data }) => {
        for (let index = 0; index < data.length; index++) {
            articles.push(data[index]);
        }
        console.log("NoticeList articles \\> ");
        console.log(articles[0]);
    },
    (error) => {
        console.log(error);
    }
);

console.log("NoticeList articles \\> ");
console.log(articles);
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
            <NoticeListItem :articles="articles" :pgno="param.pgno" />
        </tbody>
    </table>
</template>
