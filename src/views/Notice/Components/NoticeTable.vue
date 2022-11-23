<script setup>
import { onMounted } from "vue";

//example components
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import FooterDefault from "@/examples/footers/FooterDefault.vue";

//notice
import NoticeList from "@/views/Notice/Components/NoticeList.vue";

//pagination
import MaterialPagination from "@/components/MaterialPagination.vue";
import MaterialPaginationItem from "@/components/MaterialPaginationItem.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";
import backgroundImage from "@/assets/img/background.jpg";
import MaterialButton from "@/components/MaterialButton.vue";

import Router from "@/router";

onMounted(() => {
    setMaterialInput();
});

function moveNoticeRegist() {
    Router.replace("/notice/regist");
}
</script>
<template>
    <section>
        <div class="page-header min-vh-100" :style="{ backgroundImage: `url(${backgroundImage})` }">
            <span class="mask bg-gradient-dark opacity-6"></span>
            <div class="container">
                <div class="row">
                    <div class="card card-body shadow-blur mx-md-4 mt-11 mb-6">
                        <!-- <div class="card d-flex bg-opacity-100 justify-content-center shadow-lg my-sm-0 my-sm-6 mt-8 mb-5"> -->
                        <div class="card-header p-0 position-relative mt-n5 mx-3 z-index-2 bg-transparent">
                            <div class="bg-gradient-dark shadow-dark border-radius-lg p-3">
                                <h3 class="text-white text-success mb-0">공지사항</h3>
                            </div>
                        </div>
                        <div class="card-body">
                            <NoticeList></NoticeList>
                            <div class="d-flex justify-content-end">
                                <MaterialButton
                                    size="sm"
                                    class="my-2 me-5"
                                    variant="outline"
                                    color="dark"
                                    @click="moveNoticeRegist"
                                    ><div class="d-flex align-items-center">
                                        <i class="fa fa-light fa-pen me-2"></i>
                                        글작성
                                    </div>
                                </MaterialButton>
                            </div>
                            <section class="py-4 pb-2">
                                <div class="container">
                                    <div class="row justify-space-between py-2">
                                        <div class="col-lg-4 mx-auto d-flex justify-content-center">
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
</template>
