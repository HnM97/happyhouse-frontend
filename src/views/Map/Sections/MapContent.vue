<script setup>
import KakaoMap from "../Components/KakaoMap.vue";
import { useMapStore } from "@/stores/MapStore.js";
import { onMounted, onUpdated, onBeforeMount } from "@vue/runtime-core";

const store = useMapStore();
</script>

<template>
  <div>
    <h1>Map Content</h1>
    {{ store.regCode }}
    <KakaoMap />
  </div>
</template>
