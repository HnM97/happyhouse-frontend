import { apiInstance } from "./index.js";

const api = apiInstance();

function listNotice(param, success, fail) {
    api.get(`notice/notices`, { params: param }).then(success).catch(fail);
}

function getNotice(articleno, success, fail) {
    api.get(`notice/notices/${articleno}`).then(success).catch(fail);
}

function writeNotice(article, success, fail) {
    api.post(`notice/notices`, JSON.stringify(article)).then(success).catch(fail);
}

function modifyNotice(article, success, fail) {
    api.put(`notice/notices`, JSON.stringify(article)).then(success).catch(fail);
}

function deleteNotice(param, success, fail) {
    api.delete(`notice/notices?articleno=${param.articleno}&pgNo=${param.pgNo}`).then(success).catch(fail);
}

export { listNotice, getNotice, writeNotice, modifyNotice, deleteNotice };
