<script setup>
import { ref } from "vue";
import FilterBar from "../../../examples/filterbars/FilterBar.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialCheckbox from "@/components/MaterialCheckbox.vue";
import bootstrap from "bootstrap/dist/js/bootstrap.min.js";
import { useMapStore } from "@/stores/MapStore.js";
const checks = ["Hospital", "Subway", "BookMark"];
const conditions = ["Amount", "Popular", "Area"];

const store = useMapStore();
const keyword = ref("");
function handleSearch() {
  store.resetAptList;
  store.changeRegcode(keyword);
}
</script>

<template>
  <div class="text-center bg-body">
    <div class="row mt-3 mb-2" style="col-gap: 0">
      <div class="d-inline-flex col-3 ms-5 align-items-center">
        <MaterialInput
          v-model="keyword"
          class="input-group-dynamic rounded-2 me-3"
          placeholder="Type here..."
          size="md"
        />
        <a
          @click="handleSearch"
          href="#"
          class="btn mb-0 btn-sm bg-gradient-secondary text-nowrap"
          >검색</a
        >
      </div>
      <div
        class="col-1 border-black my-auto"
        v-for="(check, index) in checks"
        :key="index"
      >
        <MaterialCheckbox class="ps-0" :id="`check-${index}`" checked>
          {{ check }}
        </MaterialCheckbox>
      </div>
      <div
        class="col-1 border-black me-3"
        v-for="(condition, index) in conditions"
        :key="index"
      >
        <div class="dropdown mt-2">
          <button
            class="btn btn-sm btn-secondary dropdown-toggle"
            type="button"
            size="sm"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {{ condition }}
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
