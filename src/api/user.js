import { apiInstance } from "./index.js";

const api = apiInstance();

async function findById(userid, success, fail) {
    api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
    await api.get(`/user/info/${userid}`).then(success).catch(fail);
}

async function logout(userid, success, fail) {
    await api.get(`/user/logout/${userid}`).then(success).catch(fail);
}

async function join(user, success, fail) {
    await api.post(`/user/users`, JSON.stringify(user)).then(success).catch(fail);
}

async function login(user, success, fail) {
    await api.post(`/user/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
    api.defaults.headers["refresh-token"] = sessionStorage.getItem("refresh-token"); //axios header에 refresh-token 셋팅
    await api.post(`/user/refresh`, user).then(success).catch(fail);
}

async function modifyUser(user, success, fail) {
    await api.put(`/user/users`, JSON.stringify(user)).then(success).catch(fail);
}

async function deleteUser(userid, success, fail) {
    await api.delete(`/user/users/${userid}`).then(success).catch(fail);
}

export { findById, logout, join, login, tokenRegeneration, modifyUser, deleteUser };
