<script setup>
import { onMounted } from "vue";

//Vue Material Kit 2 components
import MaterialAvatar from "@/components/MaterialAvatar.vue";
import MaterialButton from "@/components/MaterialButton.vue";

// example components
import DefaultNavbar from "@/examples/navbars/NavbarDefault.vue";
import Header from "@/examples/Header.vue";

// sections
import Footer from "@/views/LandingPages/Author/Sections/AuthorFooter.vue";
import Profile from "@/views/LandingPages/Author/Sections/AuthorProfile.vue";
import Posts from "@/views/LandingPages/Author/Sections/AuthorPosts.vue";
import Contact from "@/views/LandingPages/Author/Sections/AuthorContact.vue";

// image
import image from "@/assets/img/city-profile.jpg";
import notice from "@/assets/img/notice.jpg";

// material-input
import setMaterialInput from "@/assets/js/material-input";
onMounted(() => {
  setMaterialInput();
});
</script>
<template>
  <DefaultNavbar transparent />
  <Header>
    <div class="page-header min-height-400" :style="{ backgroundImage: `url(${image})` }" loading="lazy">
      <span class="mask bg-gradient-dark opacity-8"></span>
    </div>
  </Header>
  <!-- <div class="card-header p-0 position-relative mt-n4 mx-auto z-index-2 bg-transparent w-50">
    <div class="bg-gradient-dark shadow-dark border-radius-lg p-3">
      <h3 class="text-white text-success mb-0">글번호. 글제목</h3>
    </div>
  </div> -->
  <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6 mb-4">
    <section class="py-sm-7 py-5 position-relative">
      <div class="container">
        <div class="row">
          <div class="col-12 mx-auto">
            <div class="mt-n8 mt-md-n9 text-center">
              <div class="blur-shadow-avatar">
                <MaterialAvatar size="xxl" class="shadow-xl position-relative z-index-2" :image="notice" alt="Avatar" />
              </div>
            </div>
            <div class="row py-7">
              <div class="col-lg-7 col-md-7 z-index-2 position-relative px-md-2 px-sm-5 mx-auto">
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
                  공지사항 내용입니다 공지사항 내용입니다 공지사항 내용입니다 공지사항 내용입니다 공지사항 내용입니다
                  공지사항 내용입니다 공지사항 내용입니다 공지사항 내용입니다 공지사항 내용입니다 공지사항 내용입니다
                  공지사항 내용입니다 공지사항 내용입니다 공지사항 내용입니다 공지사항 내용입니다 공지사항 내용입니다
                  공지사항 내용입니다 공지사항 내용입니다 공지사항 내용입니다 공지사항 내용입니다 공지사항 내용입니다
                  <br />
                  <!-- <a href="javascript:;" class="text-success icon-move-right"
                    >More about me
                    <i class="fas fa-arrow-right text-sm ms-1"></i>
                  </a> -->
                </p>
                <div class="row my-6">
                  <div class="col d-flex justify-content-end">
                    <MaterialButton class="m-1 mb-0" variant="outline" color="info" size="sm">목록</MaterialButton>
                    <MaterialButton class="m-1 mb-0" variant="outline" color="success" size="sm">수정</MaterialButton>
                    <MaterialButton class="m-1 mb-0" variant="outline" color="danger" size="sm">삭제</MaterialButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
