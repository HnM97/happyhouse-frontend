import { defineStore } from "pinia";

export const noticeStore = defineStore("noticeStore", {
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
    },
});
