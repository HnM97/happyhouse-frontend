<script setup>
import { RouterLink } from "vue-router";
defineProps({
  headers: {
    type: Array,
    default: () => ["글번호", "제목", "작성자", "작성일", "조회수"],
  },
  rows: {
    type: Array,
    required: true,
    articleno: Number,
    subject: String,
    userid: String,
    registertime: String,
    hit: Number,
  },
});
</script>
<template>
  <tr v-for="({ articleno, subject, userid, registertime, hit }, index) of rows" :key="index">
    <td class="align-middle text-center w-1">
      <p class="text-sm mb-0">{{ articleno }}</p>
    </td>
    <td class="align-middle w-5">
      <RouterLink
        :to="{ name: 'noticedetail', params: { articleno: articleno } }"
        class="text-sm font-weight-bold mb-0 ps-3"
      >
        {{ subject }}
      </RouterLink>
    </td>
    <td class="align-middle text-center w-2">
      <p class="text-sm mb-0">{{ userid }}</p>
    </td>
    <td class="align-middle text-center w-2">
      <p class="text-sm mb-0">{{ registertime }}</p>
    </td>
    <td class="align-middle text-center w-1">
      <p class="text-sm mb-0">{{ hit }}</p>
    </td>
  </tr>
</template>
