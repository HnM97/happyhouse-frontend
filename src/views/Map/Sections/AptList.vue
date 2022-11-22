<script setup>
import { useMapStore } from "@/stores/MapStore.js";
import { ref, computed, onMounted, onBeforeMount, reactive, watch } from "vue";
import AptListItem from "../Components/AptListItem.vue";
const store = useMapStore();
const list = reactive({ aptList: [] });

const showList = ref("none");

store.$subscribe((mutation, state) => {
  list.aptList = state.aptList;
  console.log("subscribe");
});

watch(
  () => store.aptList,
  (aptList, preList) => {
    list.aptList = aptList;
    console.log(showList.value);
    showList.value = "true";
    console.log("watch");
  }
);
</script>

<template>
  <h1>Apart List</h1>
  <ul>
    <li :display="showList" v-for="(apt, index) in list.aptList" :key="index">
      <AptListItem :apt="apt" />
    </li>
  </ul>
</template>
