import { apiInstance } from "./index.js";

const api = apiInstance();

function listNotice(param, success, fail) {
    api.get(`/notice/notices`, { params: param }).then(success).catch(fail);
}

function writeNotice(article, success, fail) {
    api.post(`/notice`, JSON.stringify(article)).then(success).catch(fail);
}

function getNotice(articleno, success, fail) {
    api.get(`/notice/notices/${articleno}`).then(success).catch(fail);
}

function modifyNotice(article, success, fail) {
    alert("api notice.js : " + JSON.stringify(article));
    api.put(`/notice/notices`, JSON.stringify(article)).then(success).catch(fail);
}

function deleteNotice(param, success, fail) {
    api.delete(`/notice/notices?articleno=${param.articleno}&pgno=${param.pgno}`).then(success).catch(fail);
}

export { listNotice, writeNotice, getNotice, modifyNotice, deleteNotice };
