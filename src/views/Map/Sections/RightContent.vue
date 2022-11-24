<script setup>
import { useMapStore } from "@/stores/MapStore.js";
import { ref, computed, onMounted, onBeforeMount, reactive, watch } from "vue";
import AptListItem from "../Components/AptListItem.vue";
import AptDetail from "../Components/AptDetail.vue";
const store = useMapStore();
const list = reactive({ aptList: [] });

const showList = ref(true);
const showDetail = ref(false);

watch(
  () => store.aptList,
  (aptList, preList) => {
    list.aptList = aptList;
    console.log(showList.value);
    showList.value = true;
    showDetail.value = false;
    console.log("watch");
  }
);

watch(
  () => store.selectedMarker.marker,
  (selectedMarker, preMarker) => {
    console.log("selected in RightContent");
    showList.value = false;
    showDetail.value = true;
    console.log(showList.value);
    console.log(showDetail.value);
  }
);

onMounted(() => {
  if (store.keyword != null) {
    list.aptList = store.aptList;
  }
});
</script>

<template>
  <div v-show="showList" style="overflow: scroll; height: 750px">
    <ul style="list-style-type: none">
      <li v-for="(apt, index) in list.aptList" :key="index">
        <AptListItem :apt="apt" />
      </li>
    </ul>
  </div>
  <div v-show="showDetail" style="overflow: scroll; height: 750px">
    <AptDetail />
  </div>
</template>

<style scoped>
html ul,
li {
  margin-left: 0;
  padding-left: 0;
}
</style>
