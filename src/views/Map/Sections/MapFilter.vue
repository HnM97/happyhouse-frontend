<script setup>
import { ref } from "vue";
import MapFilterBar from "../../../examples/filterbars/FilterBar.vue";
import { useMapStore } from "@/stores/MapStore.js";
const checks = ["Hospital", "Subway", "BookMark"];
const conditions = ["Amount", "Popular", "Area"];

const store = useMapStore();
const keyword = ref("");

function handleSearch() {
  console.log(keyword);
  store.changeRegcode(keyword).then(() => {
    Router.push({ path: "/map" });
    console.log("after changeRegcode");
  });
}
</script>

<template>
  <MapFilterBar v-model="keyword" class="text-center bg-body" :checks="checks" :conditions="conditions" />
</template>
