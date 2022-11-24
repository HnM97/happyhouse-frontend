<script setup>
import MaterialTextArea from "@/components/MaterialTextArea.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import QnaDetailMemoList from "@/views/QnA/Components/QnaDetailMemoList.vue";
import { onMounted, reactive, ref } from "vue";

import Router from "@/router";
import { useRoute } from "vue-router";
import { listComment } from "@/api/qna";
import { useQnaStore } from "@/stores/QnaStore.js";
import { useUserStore } from "@/stores/UserStore.js";

const route = useRoute();
const qnaStore = useQnaStore();
const userStore = useUserStore();

const userInfo = userStore.userInfo;
const props = defineProps({
    articleNo: {
        type: Number,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
});

const memos = reactive([]);

const memo = reactive({
    memoNo: 1,
    articleNo: props.articleNo,
    userId: userInfo.userId,
    comment: "",
    memoTime: "",
});

initMemo();

function initMemo() {
    listComment(
        memo.articleNo,
        ({ data }) => {
            console.log(data);
            if (data) {
                memos.length = 0;
                for (let index = 0; index < data.list.length; index++) {
                    memos.push(data.list[index]);
                }
            }
        },
        (error) => {
            console.log(error);
        }
    );
}

async function onSubmit() {
    if (!memo.comment) {
        alert("답변을 입력하세요");
        return;
    }
    await qnaStore.writeCommentContent(memo);
    // Router.replace({ path: `/qna/detail/${memo.articleNo}/${paramPgNo}` });
    location.reload();
}

function onReset() {
    memo.comment = "";
}
</script>

<template>
    <form class="pt-5 px-10" id="contact-form" method="post">
        <div class="card-body pt-1 px-0">
            <div class="row">
                <div class="text-lg mb-0">
                    <MaterialTextArea
                        class="input-group-static mb-4"
                        placeholder="답변을 입력하세요"
                        v-model="memo.comment"
                        :rows="4"
                        @keyup="test"
                        >Comment</MaterialTextArea
                    >
                </div>
            </div>
            <div class="row">
                <div class="col d-flex justify-content-end">
                    <MaterialButton
                        class="m-1 mb-0"
                        variant="outline"
                        color="secondary"
                        @click.prevent="onSubmit"
                        size="sm"
                        >작성</MaterialButton
                    >
                    <MaterialButton
                        class="m-1 mb-0"
                        variant="outline"
                        color="secondary"
                        @click.prevent="onReset"
                        size="sm"
                        >취소</MaterialButton
                    >
                </div>
            </div>
        </div>
    </form>
    <table class="table align-items-center my-3 mt-2">
        <tbody class="">
            <tr v-for="({ memoNo, articleNo, userId, comment, memoTime }, index) of memos" :key="index">
                <QnaDetailMemoList
                    :articleNo="articleNo"
                    :userId="userId"
                    :memoNo="memoNo"
                    :comment="comment"
                    :memoTime="memoTime"
                />
            </tr>
        </tbody>
    </table>
</template>
