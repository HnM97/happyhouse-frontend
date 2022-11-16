<script setup>
import { onMounted } from "vue";

//example components
import DefaultNavbar from "@/examples/navbars/NavbarDefault.vue";
import DefaultFooter from "@/examples/footers/FooterDefault.vue";

//notice
import NoticeList from "@/components/Notice/NoticeList.vue";

//pagination
import MaterialPagination from "@/components/MaterialPagination.vue";
import MaterialPaginationItem from "@/components/MaterialPaginationItem.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";
onMounted(() => {
  setMaterialInput();
});
</script>
<template>
  <div class="container position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <DefaultNavbar
          :sticky="true"
          :action="{
            route: 'https://www.creative-tim.com/product/vue-material-kit-pro',
            color: 'bg-gradient-success',
            label: 'Buy Now',
          }"
        />
      </div>
    </div>
  </div>
  <section>
    <div class="page-header min-vh-100">
      <div class="container">
        <div class="row">
          <div class="card d-flex blur justify-content-center shadow-lg my-sm-0 my-sm-6 mt-8 mb-5">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
              <div class="bg-gradient-dark shadow-dark border-radius-lg p-3">
                <h3 class="text-white text-success mb-0">공지사항</h3>
              </div>
            </div>
            <div class="card-body">
              <NoticeList></NoticeList>
              <section class="py-4 pb-3">
                <div class="container">
                  <div class="row justify-space-between py-2">
                    <div class="col-lg-4 mx-auto">
                      <MaterialPagination>
                        <MaterialPaginationItem prev />
                        <MaterialPaginationItem label="1" />
                        <MaterialPaginationItem label="2" active />
                        <MaterialPaginationItem label="3" />
                        <MaterialPaginationItem label="4" />
                        <MaterialPaginationItem label="5" />
                        <MaterialPaginationItem next />
                      </MaterialPagination>
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

  <DefaultFooter />
</template>
