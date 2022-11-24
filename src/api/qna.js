import { apiInstance } from "./index.js";

const api = apiInstance();

function listQna(param, success, fail) {
    api.get(`/qna/qnas`, { params: param }).then(success).catch(fail);
}

function getQna(articleno, success, fail) {
    api.get(`/qna/qnas/${articleno}`).then(success).catch(fail);
}

function writeQna(article, success, fail) {
    alert("qna api writeQna JSON.stringify(article) : " + JSON.stringify(article));
    api.post(`/qna/qnas`, JSON.stringify(article)).then(success).catch(fail);
}

function modifyQna(article, success, fail) {
    alert(JSON.stringify(article));
    api.put(`/qna/qnas`, JSON.stringify(article)).then(success).catch(fail);
}

function deleteQna(param, success, fail) {
    api.delete(`/qna/qnas?articleno=${param.articleno}&pgNo=${param.pgNo}`).then(success).catch(fail);
}

export { listQna, getQna, writeQna, modifyQna, deleteQna };
