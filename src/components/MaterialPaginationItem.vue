<script setup>
defineProps({
    label: {
        type: String,
        default: "",
    },
    active: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    prev: {
        type: Boolean,
        default: false,
    },
    next: {
        type: Boolean,
        default: false,
    },
    value: {
        type: String,
        default: "",
    },
    pgNaviNo: {
        type: Number,
        default: 1,
    },
    currentPage: {
        type: Number,
        default: 1,
    },
});
function getClasses(active, disabled, pgNaviNo, currentPage, prev, next) {
    let activeValue, disabledValue;
    if (!prev && !next) {
        active = pgNaviNo === currentPage;
    }
    activeValue = active && "active";
    disabledValue = disabled && "disabled";

    return `${activeValue} ${disabledValue}`;
}
</script>
<template>
    <li class="page-item" :class="getClasses(active, disabled, pgNaviNo, currentPage, prev, next)">
        <a class="page-link" href="javascript:;">
            <span aria-hidden="true" :class="active ? 'text-white' : ''">
                {{ prev || next ? null : label }}
                <i v-if="prev" class="fa fa-angle-double-left"></i>
                <i v-if="next" class="fa fa-angle-double-right"></i>
            </span>
        </a>
    </li>
</template>
