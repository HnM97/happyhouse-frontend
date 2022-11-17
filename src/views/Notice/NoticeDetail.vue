<script setup>
import { onMounted } from "vue";

//example components
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import FooterDefault from "@/examples/footers/FooterDefault.vue";

import Header from "@/examples/Header.vue";

import MaterialAvatar from "@/components/MaterialAvatar.vue";
import MaterialButton from "@/components/MaterialButton.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";
import backgroundImage from "@/assets/img/background.jpg";

import notice from "@/assets/img/notice.jpg";

onMounted(() => {
  setMaterialInput();
});
</script>
<template>
  <NavbarDefault transparent />

  <!-- <Header>
    <div class="page-header min-height-400"><span class="mask bg-gradient-dark opacity-8"></span></div>
  </Header> -->
  <section>
    <div class="min-vh-100" :style="{ backgroundImage: `url(${backgroundImage})` }">
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container">
        <div class="row">
          <div class="card card-body shadow-blur mx-md-4 mt-11 mb-4">
            <!-- <div class="card d-flex bg-opacity-100 justify-content-center shadow-lg my-sm-0 my-sm-6 mt-8 mb-5"> -->
            <!-- <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
              <div class="bg-gradient-dark shadow-dark border-radius-lg p-3">
                <h3 class="text-white text-success mb-0">공지사항</h3>
              </div>
            </div> -->
            <div class="card-body">
              <section class="py-sm-1 position-relative">
                <div class="container">
                  <div class="row">
                    <div class="col-12 mx-auto d-flex justify-content-center">
                      <MaterialAvatar
                        size="xxl"
                        class="shadow-xl position-relative z-index-2 m-4"
                        :image="notice"
                        alt="Avatar"
                      />
                      <!-- <div class="row mt-n8 mt-md-n10 text-center position-relative">
                        <div class="blur-shadow-avatar"></div>
                      </div> -->
                      <div class="row py-1">
                        <div class="col-lg-8 col-md-8 z-index-2 position-relative px-md-2 px-sm-5 mx-auto">
                          <div class="align-items-center my-4">
                            <h3 class="">subject</h3>
                          </div>
                          <div class="row my-2 mb-4 justify-content-between">
                            <div class="col-4 d-flex justify-content-start">
                              <span>작성자</span> &nbsp;
                              <span class="h6 me-1">김싸피</span>
                            </div>
                            <div class="col-3 d-flex justify-content-end">
                              <span>조회수</span> &nbsp;
                              <span class="h6 me-1">7</span>
                            </div>
                          </div>
                          <p class="text-lg mb-0">
                            공지사항 내용입니다 공지사항 내용입니다 공지사항 내용입니다 공지사항 내용입니다 공지사항
                            내용입니다 공지사항 내용입니다 공지사항 내용입니다 공지사항 내용입니다 공지사항 내용입니다
                            공지사항 내용입니다 공지사항 내용입니다 공지사항 내용입니다 공지사항 내용입니다 공지사항
                            내용입니다 공지사항 내용입니다 공지사항 내용입니다 공지사항 내용입니다 공지사항 내용입니다
                            공지사항 내용입니다 공지사항 내용입니다
                            <br />
                            <!-- <a href="javascript:;" class="text-success icon-move-right"
                    >More about me
                    <i class="fas fa-arrow-right text-sm ms-1"></i>
                  </a> -->
                          </p>
                          <div class="row my-6">
                            <div class="col d-flex justify-content-end">
                              <MaterialButton class="m-1 mb-0" variant="outline" color="info" size="sm"
                                >목록</MaterialButton
                              >
                              <MaterialButton class="m-1 mb-0" variant="outline" color="success" size="sm"
                                >수정</MaterialButton
                              >
                              <MaterialButton class="m-1 mb-0" variant="outline" color="danger" size="sm"
                                >삭제</MaterialButton
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <FooterDefault />
</template>
