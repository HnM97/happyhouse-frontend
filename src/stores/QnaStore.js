import { defineStore } from "pinia";
import { getQna, writeQna, modifyQna, deleteQna } from "@/api/qna";

export const useQnaStore = defineStore("useQnaStore", {
    persist: true,

    state: () => ({
        qna: {
            articleno: null,
            userid: "",
            username: "",
            subject: "",
            content: "",
            hit: null,
            registertime: null,
        },
        pgNo: 0,
    }),
    actions: {
        setQna(qna) {
            this.qna.articleno = qna.articleno;
            this.qna.userid = qna.userid;
            this.qna.username = qna.username;
            this.qna.subject = qna.subject;
            this.qna.content = qna.content;
            this.qna.hit = qna.hit;
            this.qna.registertime = qna.registerTime;
        },

        setPgNo(pgNo) {
            this.pgNo = pgNo;
        },

        async writeQnaContent(param) {
            await writeQna(
                param,
                ({ data }) => {
                    console.log("QnaStore writeQnaContent data : ");
                    console.log(data);
                    let msg = "등록 처리시 문제가 발생했습니다.";
                    if (data === "success") {
                        msg = "등록이 완료되었습니다.";
                    }
                    alert(msg);
                },
                (error) => {
                    console.log(error);
                }
            );
        },
    },
});
