<script setup>
import MaterialInput from "../../components/MaterialInput.vue";
import MaterialCheckbox from "@/components/MaterialCheckbox.vue";
// images
import ArrDark from "@/assets/img/down-arrow-dark.svg";
import downArrow from "@/assets/img/down-arrow.svg";
import DownArrWhite from "@/assets/img/down-arrow-white.svg";

const props = defineProps({
  conditions: {
    type: Array,
    required: true,
    default: [],
  },
  checks: {
    type: Array,
    required: false,
    default: [],
  },
  inputType: {
    type: String,
    default: "input-group-dynamic",
  },
});
</script>

<template>
  <div class="row mt-4" style="col-gap: 0">
    <div class="d-inline-flex col-3 ms-5">
      <MaterialInput :class="inputType" class="rounded-2 border-right-0" placeholder="Type here..." size="md" />
      <a href="/map" class="btn btn-md ms-0 mb-0 border-left-0 bg-gradient-success text-nowrap" size="md">검색</a>
    </div>
    <div class="col-1 border-black" v-for="(check, index) in checks" :key="index">
      <MaterialCheckbox class="" id="terms" checked>
        {{ check }}
      </MaterialCheckbox>
    </div>
    <div class="col-1 border-black" v-for="(condition, index) in conditions" :key="index">
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
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
</template>
