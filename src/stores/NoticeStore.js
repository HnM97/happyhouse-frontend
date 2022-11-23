import { defineStore } from "pinia";
import { listNotice, getNotice, writeNotice, modifyNotice, deleteNotice } from "@/api/notice";

export const useNoticeStore = defineStore("useNoticeStore", {
    persist: true,

    state: () => ({
        notice: {
            articleno: null,
            userid: "",
            username: "",
            subject: "",
            content: "",
            hit: null,
            registertime: null,
        },
        pgno: 0,
    }),
    actions: {
        setNotice(notice) {
            this.notice.articleno = notice.articleno;
            this.notice.userid = notice.userid;
            this.notice.username = notice.username;
            this.notice.subject = notice.subject;
            this.notice.content = notice.content;
            this.notice.hit = notice.hit;
            this.notice.registertime = notice.registerTime;
        },

        setPgno(pgno) {
            this.pgno = pgno;
        },

        async listNoticeTable(noticeparam) {
            await listNotice(
                noticeparam,
                ({ data }) => {
                    for (let index = 0; index < data.length; index++) {
                        articles.push(data[index]);
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
        },

        async writeNoticeContent(param) {
            await writeNotice(
                param,
                ({ data }) => {
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
