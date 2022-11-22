import jwtDecode from "jwt-decode";
import Router from "@/router";
import { login, findById, tokenRegeneration, logout } from "@/api/user";
import { defineStore } from "pinia";

export const userStore = defineStore("userStore", {
    persist: true,

    state: () => ({
        isLogin: false,
        isLoginError: false,
        userInfo: {
            userName: "",
            userId: "",
            userPwd: "",
            email: "",
        },
        isValidToken: false,
    }),

    actions: {
        setIsLogin(isLogin) {
            this.isLogin = isLogin;
        },
        setIsLoginError(isLoginError) {
            this.isLoginError = isLoginError;
        },
        setIsValidToken(isValidToken) {
            this.isValidToken = isValidToken;
        },
        setUserInfo(userInfo) {
            if (userInfo === null) {
                this.userInfo.userName = "";
                this.userInfo.userId = "";
                this.userInfo.userPwd = "";
                this.userInfo.email = "";
            } else {
                this.userInfo.userName = userInfo.userName;
                this.userInfo.userId = userInfo.userId;
                this.userInfo.userPwd = userInfo.userPwd;
                this.userInfo.email = userInfo.email;
            }
        },

        async userConfirm(user) {
            // alert("userStore userConfirm");
            await login(
                user,
                ({ data }) => {
                    if (data.message === "success") {
                        let accessToken = data["access-token"];
                        let refreshToken = data["refresh-token"];
                        // console.log("userStore login success token created!!!! >> ", accessToken, refreshToken);

                        // commit("SET_IS_LOGIN", true);
                        // commit("SET_IS_LOGIN_ERROR", false);
                        // commit("SET_IS_VALID_TOKEN", true);
                        this.setIsLogin(true);
                        this.setIsLoginError(false);
                        this.setIsValidToken(true);
                        sessionStorage.setItem("access-token", accessToken);
                        sessionStorage.setItem("refresh-token", refreshToken);
                    } else {
                        // commit("SET_IS_LOGIN", false);
                        // commit("SET_IS_LOGIN_ERROR", true);
                        // commit("SET_IS_VALID_TOKEN", false);
                        this.setIsLogin(false);
                        this.setIsLoginError(true);
                        this.setIsValidToken(false);
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
        },

        async getUserInfo(token) {
            // alert("userStore getUserInfo");
            let decodeToken = jwtDecode(token);
            // console.log("userStore 2. getUserInfo() decodeToken :: ", decodeToken);
            await findById(
                decodeToken.userid,
                ({ data }) => {
                    // alert("userStore getUserInfo findById");
                    if (data.message === "success") {
                        // console.log("userStore 3. getUserInfo data >> ", data);
                        const email = data.userInfo.emailId + "@" + data.userInfo.emailDomain;
                        const dataUserInfo = {
                            userName: data.userInfo.userName,
                            userId: data.userInfo.userId,
                            userPwd: data.userInfo.userPwd,
                            email: email,
                        };

                        // commit("SET_USER_INFO", data.userInfo);
                        this.setUserInfo(dataUserInfo);
                    } else {
                        console.log("유저 정보 없음!!!!");
                    }
                },
                async (error) => {
                    console.log("getUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ", error.response.status);
                    // commit("SET_IS_VALID_TOKEN", false);
                    this.setIsValidToken(false);
                    // await dispatch("tokenRegeneration");
                }
            );
        },

        async tokenRegeneration({ state }) {
            console.log("토큰 재발급 >> 기존 토큰 정보 : {}", sessionStorage.getItem("access-token"));
            await tokenRegeneration(
                JSON.stringify(state.userInfo),
                ({ data }) => {
                    if (data.message === "success") {
                        let accessToken = data["access-token"];
                        console.log("재발급 완료 >> 새로운 토큰 : {}", accessToken);
                        sessionStorage.setItem("access-token", accessToken);
                        // commit("SET_IS_VALID_TOKEN", true);
                        this.setIsValidToken(true);
                    }
                },
                async (error) => {
                    // HttpStatus.UNAUTHORIZE(401) : RefreshToken 기간 만료 >> 다시 로그인!!!!
                    if (error.response.status === 401) {
                        console.log("갱신 실패");
                        // 다시 로그인 전 DB에 저장된 RefreshToken 제거.
                        await logout(
                            state.userInfo.userid,
                            ({ data }) => {
                                if (data.message === "success") {
                                    console.log("리프레시 토큰 제거 성공");
                                } else {
                                    console.log("리프레시 토큰 제거 실패");
                                }
                                alert("RefreshToken 기간 만료!!! 다시 로그인해 주세요.");
                                // commit("SET_IS_LOGIN", false);
                                // commit("SET_USER_INFO", null);
                                // commit("SET_IS_VALID_TOKEN", false);
                                this.setIsLogin(false);
                                this.setUserInfo(null);
                                this.setIsValidToken(false);
                                Router.push({ name: "login" });
                            },
                            (error) => {
                                console.log(error);
                                // commit("SET_IS_LOGIN", false);
                                // commit("SET_USER_INFO", null);
                                this.setIsLogin(false);
                                this.setUserInfo(null);
                            }
                        );
                    }
                }
            );
        },

        async userLogout(userid) {
            await logout(
                userid,
                ({ data }) => {
                    if (data.message === "success") {
                        // commit("SET_IS_LOGIN", false);
                        // commit("SET_USER_INFO", null);
                        // commit("SET_IS_VALID_TOKEN", false);
                        this.setIsLogin(false);
                        this.setUserInfo(null);
                        this.setIsValidToken(false);
                    } else {
                        console.log("유저 정보 없음!!!!");
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
        },
    },
});
