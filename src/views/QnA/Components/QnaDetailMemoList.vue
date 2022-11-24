<script setup>
defineProps({
    articleNo: {
        type: Number,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    memoNo: {
        type: Number,
        default: 0,
    },
    comment: {
        type: String,
        default: "",
    },
    memoTime: {
        type: String,
        default: "",
    },
});
</script>
<template>
    <td>
        <p class="text-sm mb-0">{{ articleNo }}</p>
        <p class="text-sm font-weight-bold mb-0 ps-3">
            {{ userId }}
        </p>
        <p class="text-sm mb-0">{{ memoNo }}</p>
        <p class="text-sm mb-0">{{ comment }}</p>
        <p class="text-sm mb-0">{{ memoTime }}</p>
    </td>
</template>
