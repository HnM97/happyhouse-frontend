<script setup>
import { onMounted } from "vue";

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

function onSubmit() {}
</script>
<template>
    <div class="container my-auto">
        <div class="row">
            <div class="col-lg-4 col-md-8 col-12 mx-auto">
                <div class="card z-index-0 fadeIn3 fadeInBottom">
                    <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                        <div class="bg-gradient-dark shadow-dark border-radius-lg py-3 pe-1">
                            <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">회원가입</h4>
                        </div>
                    </div>
                    <div class="card-body">
                        <form role="form" class="text-start">
                            <MaterialInput
                                id="name"
                                class="input-group-outline mb-3"
                                :label="{ text: '이름', class: 'form-label' }"
                                type="text"
                            />
                            <MaterialInput
                                id="id"
                                class="input-group-outline mb-3"
                                :label="{ text: '아이디', class: 'form-label' }"
                                type="text"
                            />
                            <MaterialInput
                                id="password"
                                class="input-group-outline mb-3"
                                :label="{ text: '비밀번호', class: 'form-label' }"
                                type="password"
                            />
                            <MaterialInput
                                id="password-check"
                                class="input-group-outline mb-3"
                                :label="{ text: '비밀번호 확인', class: 'form-label' }"
                                type="password"
                            />
                            <MaterialInput
                                id="email"
                                class="input-group-outline my-3"
                                :label="{ text: '이메일', class: 'form-label' }"
                                type="email"
                            />

                            <div class="text-center">
                                <MaterialButton
                                    class="my-4 mb-2"
                                    variant="gradient"
                                    color="dark"
                                    fullWidth
                                    @click="onSubmit"
                                >
                                    회원가입
                                </MaterialButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
