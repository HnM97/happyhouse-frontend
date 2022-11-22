<script setup>
import KakaoMap from "../Components/KakaoMap.vue";
import FooterDefault from "@/examples/footers/FooterDefault.vue";
import { useMapStore } from "@/stores/MapStore.js";
import { onMounted, onUpdated, onBeforeMount } from "@vue/runtime-core";

const store = useMapStore();
</script>

<template>
  <div>
    <KakaoMap />
  </div>
</template>
