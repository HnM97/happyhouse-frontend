<script setup>
import { onMounted, reactive } from "vue";

//example components
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import FooterDefault from "@/examples/footers/FooterDefault.vue";

import Header from "@/examples/Header.vue";

import MaterialAvatar from "@/components/MaterialAvatar.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialTextArea from "@/components/MaterialTextArea.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";
import backgroundImage from "@/assets/img/background.jpg";

import regist from "@/assets/img/regist.jpg";

import Router from "@/router";

onMounted(() => {
    setMaterialInput();
});

const article = reactive({
    articleno: 0,
    userid: "",
    subject: "",
    content: "",
});
const isUserid = ref(false);

function onSubmit() {
    let err = true;
    let msg = "";
    !article.userid && ((msg = "작성자 입력해주세요"), (err = false), this.$refs.userid.focus());
    err && !this.article.subject && ((msg = "제목 입력해주세요"), (err = false), this.$refs.subject.focus());
    err && !this.article.content && ((msg = "내용 입력해주세요"), (err = false), this.$refs.content.focus());

    if (!err) alert(msg);
    else this.type === "register" ? this.registArticle() : this.modifyArticle();
}

function onReset() {
    this.article.articleno = 0;
    this.article.subject = "";
    this.article.content = "";
    this.moveList();
}
</script>

<template>
    <Header>
        <div class="page-header min-height-400" :style="{ backgroundImage: `url(${backgroundImage})` }" loading="lazy">
            <span class="mask bg-gradient-dark opacity-6"></span>
        </div>
    </Header>

    <div class="card card-body shadow-blur mx-md-8 mt-n10 mb-6">
        <section class="py-sm-1 position-relative">
            <div class="container">
                <div class="row">
                    <div class="col-3 mx-auto d-flex justify-content-center pt-5">
                        <MaterialAvatar
                            size="xxl"
                            class="shadow-xl position-relative z-index-2 m-4"
                            :image="regist"
                            alt="Avatar"
                        />
                    </div>
                    <div class="col-9 mx-auto d-flex justify-content-center">
                        <div class="row py-1">
                            <div class="col-lg-12 col-md-12 z-index-2 position-relative px-md-2 px-sm-5 mx-auto">
                                <form class="p-3" id="contact-form" method="post">
                                    <div class="card-body pt-1 px-0">
                                        <div class="row">
                                            <div class="align-items-center my-4 mt-5">
                                                <MaterialInput
                                                    class="input-group-static mb-4"
                                                    label="Subject"
                                                    type="text"
                                                    placeholder="제목을 입력하세요"
                                                />
                                            </div>
                                            <div class="my-2 mb-4">
                                                <MaterialInput
                                                    class="input-group-static mb-4"
                                                    label="Name"
                                                    type="text"
                                                    placeholder="이름을 입력하세요"
                                                />
                                            </div>
                                            <div class="text-lg mb-0">
                                                <MaterialTextArea
                                                    class="input-group-static mb-4"
                                                    placeholder="내용을 입력하세요"
                                                    :rows="6"
                                                    >Notice content</MaterialTextArea
                                                >
                                            </div>
                                        </div>
                                        <div class="row my-2 mt-4">
                                            <div class="col d-flex justify-content-end">
                                                <MaterialButton
                                                    class="m-1 mb-0"
                                                    variant="outline"
                                                    color="info"
                                                    @click="onSubmit"
                                                    >작성</MaterialButton
                                                >
                                                <MaterialButton
                                                    class="m-1 mb-0"
                                                    variant="outline"
                                                    color="danger"
                                                    @click="onReset"
                                                    >취소</MaterialButton
                                                >
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
