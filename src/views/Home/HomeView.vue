<script setup>
import { onMounted, onUnmounted } from "vue";
import HomeNotice from "./Sections/HomeNotice.vue";
import HomeAptCard from "./Sections/HomeAptCard.vue";
import NavbarDefault from "../..//examples/navbars/NavbarDefault.vue";
import Header from "../../examples/Header.vue";
import MaterialInput from "../../components/MaterialInput.vue";
import MaterialButton from "../../components/MaterialButton.vue";
//dep
import Typed from "typed.js";

// images
import vueMkHeader from "@/assets/img/vue-mk-header.jpg";

const body = document.getElementsByTagName("body")[0];

onMounted(() => {
  body.classList.add("bg-gray-200");

  if (document.getElementById("typed")) {
    // eslint-disable-next-line no-unused-vars
    var typed = new Typed("#typed", {
      strings: ["아파트를", "지역을", "가격을"],
      typeSpeed: 90,
      backSpeed: 90,
      backDelay: 200,
      startDelay: 500,
      loop: true,
    });
  }
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
  <Header>
    <div class="page-header min-vh-50" :style="`background-image: url(${vueMkHeader})`" loading="lazy">
      <div class="container">
        <div class="row">
          <div class="col-lg-7 text-center mx-auto position-relative">
            <h1 class="text-white pt-3 mt-n5 me-2" :style="{ display: 'inline-block ' }">현재 가장 핫한</h1>
            <h1 class="text-white px-5 mt-3 mb-5" :style="{ fontWeight: '500' }">
              <span class="text-white" id="typed"></span> 알아보세요 !
            </h1>
          </div>
        </div>
        <div class="row mt-5" style="col-gap: 0">
          <div class="d-inline-flex col-5 mx-auto">
            <MaterialInput class="bg-white rounded-2 border-right-0" placeholder="Type here..." size="md" />
            <a href="/map" class="btn btn-md ms-0 mb-0 border-left-0 bg-gradient-success text-nowrap" size="md">검색</a>
          </div>
        </div>
      </div>
    </div>
  </Header>
  <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6">
    <div class="row">
      <div class="col-5">
        <HomeNotice></HomeNotice>
      </div>
      <div class="col-6">
        <HomeAptCard></HomeAptCard>
      </div>
    </div>
  </div>
</template>
