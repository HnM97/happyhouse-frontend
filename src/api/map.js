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

export { keywordToReg, searchApt, getAddress };
