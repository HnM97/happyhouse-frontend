<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import HomeNotice from "./Sections/HomeNotice.vue";
import HomeAptCard from "./Sections/HomeAptCard.vue";
import NavbarDefault from "../..//examples/navbars/NavbarDefault.vue";
import Header from "../../examples/Header.vue";
import MaterialInput from "../../components/MaterialInput.vue";
import MaterialButton from "../../components/MaterialButton.vue";
import FooterDefault from "@/examples/footers/FooterDefault.vue";
import { useMapStore } from "@/stores/MapStore.js";
import Router from "@/router";
//dep
import Typed from "typed.js";

// images
import vueMkHeader from "@/assets/img/vue-mk-header.jpg";
import backgroundImage from "@/assets/img/background.jpg";

const body = document.getElementsByTagName("body")[0];
const store = useMapStore();

const keyword = ref("");

function resetMapStore() {
  store.$reset();
}

function handleSearch() {
  store.changeRegcode(keyword.value).then(() => {
    Router.push({ path: "/map" });
    console.log("after changeRegcode");
  });
}

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
      showCursor: false,
      // fadeOutDelay: true,
      loop: true,
    });
  }
});
</script>
<template>
  <div class="position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <NavbarDefault transparent />
      </div>
    </div>
  </div>
  <Header>
    <div
      class="page-header min-vh-100"
      :style="`background-image: url(${backgroundImage})`"
      loading="lazy"
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container">
        <div class="row">
          <div class="col-lg-7 text-center mx-auto position-relative">
            <h1
              class="text-white pt-3 mt-n5 me-2"
              :style="{ display: 'inline-block ' }"
            >
              현재 가장 핫한
            </h1>
            <h1
              class="text-white px-5 mt-3 mb-5"
              :style="{ fontWeight: '500' }"
            >
              <span class="text-white" id="typed"></span> 알아보세요 !
            </h1>
          </div>
        </div>
        <!-- <div class="d-flex flex-row">
          <div class="col-3"></div>
          <div class="col-2 ms-3 text-white">행정구역으로 검색하기</div>
        </div> -->
        <div class="row mt-1" style="col-gap: 0">
          <div class="d-inline-flex col-6 mx-auto">
            <MaterialInput
              class="bg-white rounded-2 border-right-0 px-3 mx-2"
              placeholder="살고싶은 지역을 검색해보세요"
              size="lg"
              v-model="keyword"
            />
            <a
              @click="handleSearch"
              href="#"
              class="btn btn-md ms-0 mb-0 border-left-0 bg-gradient-dark text-nowrap"
              size="md"
              >검색</a
            >
          </div>
        </div>
      </div>
    </div>
  </Header>
  <!-- <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6">
    <div class="row">
      <div class="col-5">
        <HomeNotice></HomeNotice>
      </div>
      <div class="col-6">
        <HomeAptCard></HomeAptCard>
      </div>
    </div>
  </div> -->
  <FooterDefault />
</template>
