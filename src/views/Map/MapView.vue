<script setup>
import NavbarDefault from "../..//examples/navbars/NavbarDefault.vue";
import MapFilter from "../../examples/filterbars/FilterBar.vue";
import AptList from "./Sections/AptList.vue";
import MapContent from "./Sections/MapContent.vue";

const checks = ["Hospital", "Subway", "BookMark"];
const conditions = ["Amount", "Popular", "Area"];
</script>
<template>
  <div class="position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <NavbarDefault light />
        <MapFilter class="text-center" :checks="checks" :conditions="conditions" />
      </div>
    </div>
    <div class="row">
      <div class="col-9">
        <MapContent class="text-center" />
      </div>
      <div class="col-3">
        <AptList class="text-center" />
      </div>
    </div>
  </div>
</template>
