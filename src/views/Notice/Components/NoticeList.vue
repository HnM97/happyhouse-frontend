<script setup>
import NoticeListItem from "@/views/Notice/Components/NoticeListItem.vue";

const tableData = {
  headers: ["글번호", "제목", "작성자", "작성일", "조회수"],
  rows: [
    {
      articleno: 1,
      userid: "test",
      subject: "testtesttest",
      hit: 1,
      registertime: "2022-11-16",
    },
    {
      articleno: 2,
      userid: "test",
      subject: "testtesttest",
      hit: 1,
      registertime: "2022-11-16",
    },
    {
      articleno: 3,
      userid: "test",
      subject: "testtesttest",
      hit: 1,
      registertime: "2022-11-16",
    },
    {
      articleno: 4,
      userid: "test",
      subject: "testtesttest",
      hit: 1,
      registertime: "2022-11-16",
    },
    {
      articleno: 5,
      userid: "test",
      subject: "testtesttest",
      hit: 1,
      registertime: "2022-11-16",
    },
    {
      articleno: 6,
      userid: "test",
      subject: "testtesttest",
      hit: 1,
      registertime: "2022-11-16",
    },
    {
      articleno: 6,
      userid: "test",
      subject: "testtesttest",
      hit: 1,
      registertime: "2022-11-16",
    },
  ],
};
</script>
<template>
  <table class="table align-items-center mb-0">
    <thead>
      <tr>
        <th
          v-for="(header, index) in tableData.headers"
          :key="header"
          class="text-center text-secondary text-md font-weight-bolder opacity-7 my-4"
        >
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <NoticeListItem v-bind="tableData" />
    </tbody>
  </table>
</template>
