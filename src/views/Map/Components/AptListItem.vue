<script setup>
defineProps({
  apt: {
    type: Object,
  },
});
</script>

<template>
  <div class="d-flex flex-column">
    <div class="row">
      {{ apt.apartmentName }}
    </div>
    <div class="row">
      {{ apt.buildYear }}
    </div>
    <div class="row">
      {{ apt.roadName }}
    </div>
  </div>
</template>

<style></style>
