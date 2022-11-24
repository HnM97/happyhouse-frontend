<script setup>
import MaterialButton from "@/components/MaterialButton.vue";
import { deleteComment } from "@/api/qna";
import { useUserStore } from "@/stores/UserStore.js";

const userStore = useUserStore();

const props = defineProps({
    articleNo: {
        type: Number,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    memoNo: {
        type: Number,
        default: 0,
    },
    comment: {
        type: String,
        default: "",
    },
    memoTime: {
        type: String,
        default: "",
    },
});

async function deletecomment() {
    if (userStore.userInfo.userId !== props.userId) {
        alert("본인이 쓴 댓글만 삭제가 가능합니다");
        return;
    }
    if (confirm("댓글을 삭제하시겠습니까?")) {
        const param = { articleno: props.articleNo, memoNo: props.memoNo };
        await deleteComment(
            param,
            ({ data }) => {
                let msg = "삭제 처리시 문제가 발생했습니다.";
                if (data === "success") {
                    msg = "삭제가 완료되었습니다.";
                }
                alert(msg);
                location.reload();
            },
            (error) => {
                console.log(error);
            }
        );
    }
}
</script>
<template>
    <td class="px-10 py-3">
        <div class="d-flex">
            <p class="text-md font-weight-bold mb-0 px-3 py-1">
                {{ props.userId }}
            </p>
            <MaterialButton class="m-1 mb-0" variant="outline" color="danger" size="sm" @click="deletecomment"
                >삭제</MaterialButton
            >
        </div>
        <p class="text-sm mb-0 px-3 py-1">{{ props.comment }}</p>
        <p class="text-sm mb-0 px-3 py-1">{{ props.memoTime }}</p>
    </td>
</template>
