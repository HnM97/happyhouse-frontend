<script setup>
import { onMounted } from "vue";

//example components
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import FooterDefault from "@/examples/footers/FooterDefault.vue";

//notice
import NoticeList from "@/views/Notice/Components/NoticeList.vue";

//pagination
import MaterialPagination from "@/components/MaterialPagination.vue";
import MaterialPaginationItem from "@/components/MaterialPaginationItem.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";
import backgroundImage from "@/assets/img/background.jpg";
import MaterialButton from "@/components/MaterialButton.vue";

import Router from "@/router";

onMounted(() => {
    setMaterialInput();
});

function moveNoticeRegist() {
    Router.push("/notice/regist");
}
</script>
<template>
    <NavbarDefault transparent />

    <router-view></router-view>

    <FooterDefault />
</template>
