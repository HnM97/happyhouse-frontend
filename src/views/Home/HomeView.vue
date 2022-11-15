<script setup>
import { onMounted, onUnmounted } from "vue";
import NavbarDefault from "../..//examples/navbars/NavbarDefault.vue";

const body = document.getElementsByTagName("body")[0];
onMounted(() => {
  body.classList.add("bg-gray-200");
});
</script>
<template>
  <div class="position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <NavbarDefault light />
      </div>
    </div>
  </div>
</template>
