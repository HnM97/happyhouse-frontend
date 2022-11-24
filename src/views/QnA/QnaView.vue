<script setup>
import { onMounted } from "vue";

//example components
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import FooterDefault from "@/examples/footers/FooterDefault.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";

onMounted(() => {
    setMaterialInput();
});
</script>
<template>
    <NavbarDefault transparent />

    <router-view></router-view>

    <FooterDefault />
</template>
