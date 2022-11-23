<script setup>
import { computed } from "@vue/reactivity";
import { reactive } from "vue";
import { RouterLink } from "vue-router";

defineProps({
    articleNo: {
        type: Number,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    registerTime: {
        type: String,
        required: true,
    },
    hit: {
        type: Number,
        required: true,
    },
    pgNo: {
        type: Number,
        required: true,
    },
    index: {
        type: Number,
        required: true,
    },
});
</script>

<template>
    <td class="align-middle text-center w-1">
        <p class="text-sm mb-0">{{ articleNo }}</p>
    </td>
    <td class="align-middle w-5">
        <RouterLink
            :to="{ name: 'noticedetail', params: { articleno: articleNo, pgNo: pgNo } }"
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
</template>
