import { apiInstance } from "./index.js";

const api = apiInstance();

/////// QnA ///////

function listQna(param, success, fail) {
    api.get(`/qna/qnas`, { params: param }).then(success).catch(fail);
}

function getQna(articleno, success, fail) {
    api.get(`/qna/qnas/${articleno}`).then(success).catch(fail);
}

function writeQna(article, success, fail) {
    api.post(`/qna/qnas`, JSON.stringify(article)).then(success).catch(fail);
}

function modifyQna(article, success, fail) {
    api.put(`/qna/qnas`, JSON.stringify(article)).then(success).catch(fail);
}

function deleteQna(param, success, fail) {
    api.delete(`/qna/qnas?articleno=${param.articleno}&pgNo=${param.pgNo}`).then(success).catch(fail);
}

/////// comment ///////

function listComment(articleno, success, fail) {
    api.get(`/qna/qnas/${articleno}/memos`).then(success).catch(fail);
}

function writeComment(param, success, fail) {
    api.post(`/qna/qnas/${param.articleNo}/memo`, JSON.stringify(param)).then(success).catch(fail);
}
// >> ex )
// const param = {
//     articleno: null,
//     memo: {
//         memoNo: 1,
//         articleNo: null,
//         userId: "",
//         comment: "",
//         memoTime: "",
//     },
// };

function deleteComment(param, success, fail) {
    api.delete(`/qna/qnas/memo?articleno=${param.articleno}&memoNo=${param.memoNo}`).then(success).catch(fail);
}

export { listQna, getQna, writeQna, modifyQna, deleteQna, listComment, writeComment, deleteComment };
