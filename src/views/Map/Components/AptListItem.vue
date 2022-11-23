<script setup>
import { onMounted, onBeforeMount, ref, computed } from "vue";
import { getAddress } from "@/api/map.js";
const props = defineProps({
  apt: {
    type: Object,
  },
});
</script>

<template>
  <div class="d-flex shadow flex-column mb-2 px-2 py-2 rounded-3 z-index-1 bg-white me-3">
    <div class="ps-2 row align-content-start">
      <div class="fw-bold fs-6">
        <font-awesome-icon icon="fa-solid fa-house" />
        {{ apt.apartmentName }}
      </div>
    </div>
    <div class="row ms-1">
      <div>
        <font-awesome-icon icon="fa-solid fa-person-digging" />
        {{ apt.buildYear }}
      </div>
    </div>
    <div class="row ms-1">
      <div>
        <font-awesome-icon class="me-1" icon="fa-solid fa-location-dot" />
        {{ apt.roadName }}
      </div>
    </div>
    <div class="row ms-1">
      <div>
        <font-awesome-icon class="me-1" icon="fa-solid fa-circle-dollar-to-slot" />
        {{ apt.minAmount }} ~ {{ apt.maxAmount }}
      </div>
    </div>
  </div>
</template>

<style></style>
