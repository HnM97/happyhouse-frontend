<script setup>
import { computed } from "@vue/reactivity";
import { reactive } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
    articles: {
        type: Array,
        required: true,
        articleNo: Number,
        subject: String,
        userId: String,
        registerTime: String,
        hit: Number,
    },
    pgno: {
        type: Number,
        required: true,
    },
});

// props (undefined)
// console.log("NoticeListItem props.articles[0].articleNo : " + props.articles[0].articleNo);
</script>

<template>
    <tr v-for="({ articleNo, subject, userId, registerTime, hit }, index) of props.articles" :key="index">
        <td class="align-middle text-center w-1">
            <p class="text-sm mb-0">{{ articleNo }}</p>
        </td>
        <td class="align-middle w-5">
            <RouterLink
                :to="{ name: 'noticedetail', params: { articleno: articleNo, pgno: props.pgno } }"
                class="text-sm font-weight-bold mb-0 ps-3"
            >
                {{ subject }}
            </RouterLink>
        </td>
        <td class="align-middle text-center w-2">
            <p class="text-sm mb-0">{{ userId }}</p>
        </td>
        <td class="align-middle text-center w-2">
            <p class="text-sm mb-0">{{ registerTime }}</p>
        </td>
        <td class="align-middle text-center w-1">
            <p class="text-sm mb-0">{{ hit }}</p>
        </td>
    </tr>
</template>
