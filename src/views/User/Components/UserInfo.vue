<script setup>
import { onMounted } from "vue";
import Router from "@/router";

// example components
import DefaultNavbar from "@/examples/navbars/NavbarDefault.vue";
import Header from "@/examples/Header.vue";

//Vue Material Kit 2 components
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialSwitch from "@/components/MaterialSwitch.vue";
import MaterialButton from "@/components/MaterialButton.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";
onMounted(() => {
  setMaterialInput();
});

function movehome() {
  Router.push("/");
}
</script>
<template>
  <div class="container my-auto">
    <div class="row">
      <div class="col-lg-4 col-md-8 col-12 mx-auto">
        <div class="card z-index-0 fadeIn3 fadeInBottom">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-dark shadow-dark border-radius-lg py-3 pe-1">
              <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">회원 정보 확인</h4>
            </div>
          </div>
          <div class="card-body">
            <form role="form" class="text-start">
              <MaterialInput
                id="name"
                class="input-group-outline mb-3"
                :label="{ text: '김싸피', class: 'form-label' }"
                type="text"
                isDisabled
              />
              <MaterialInput
                id="id"
                class="input-group-outline mb-3"
                :label="{ text: 'ssafy', class: 'form-label' }"
                type="text"
                isDisabled
              />
              <MaterialInput
                id="password"
                class="input-group-outline mb-3"
                :label="{ text: '1234', class: 'form-label' }"
                type="password"
                isDisabled
              />
              <MaterialInput
                id="email"
                class="input-group-outline my-3"
                :label="{ text: 'ssafy@ssafy.com', class: 'form-label' }"
                type="email"
                isDisabled
              />

              <div class="text-center row">
                <div class="col d-flex">
                  <MaterialButton @click="movehome" class="m-1 my-4 mb-2" variant="gradient" color="dark" fullWidth>
                    확인
                  </MaterialButton>
                  <MaterialButton class="m-1 my-4 mb-2" variant="gradient" color="dark" fullWidth>
                    수정
                  </MaterialButton>
                  <MaterialButton class="m-1 my-4 mb-2" variant="gradient" color="dark" fullWidth>
                    삭제
                  </MaterialButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
