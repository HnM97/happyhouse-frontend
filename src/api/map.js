import { apiInstance } from "./index.js";

const api = apiInstance();

async function keywordToReg(keyword, success, fail) {
  api.get(`/house/search/${keyword}`).then(success).catch(fail);
}

async function searchApt(param, success, fail) {
  api.get(`/house/search/`, { params: param }).then(success).catch(fail);
}
async function getAddress(param, success, fail) {
  api.get(`/house/address/`, { params: param }).then(success).catch(fail);
}

async function getDealByApt(param, success, fail) {
  api
    .get(`/house/view/`, { params: { aptCode: param } })
    .then(success)
    .catch(fail);
}

async function addBookmark(userId, aptCode, success, fail) {
  api.post(`/bookmark`, { userId: userId, aptCode: aptCode }).then(success).catch(fail);
}

async function deleteBookmark(userId, aptCode, success, fail) {
  api
    .delete(`/bookmark`, { params: { userId: userId, aptCode: aptCode } })
    .then(success)
    .catch(fail);
}

async function getBookmarkList(userId, success, fail) {
  api.get(`/house/bookmark?userId=${userId}`).then(success).catch(fail);
}

export { keywordToReg, searchApt, getAddress, getDealByApt, addBookmark, deleteBookmark, getBookmarkList };
