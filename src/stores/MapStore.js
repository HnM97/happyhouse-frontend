import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import { keywordToReg, searchApt, getAddress } from "@/api/map.js";
export const useMapStore = defineStore("useMapStore", {
  persist: true,
  state: () => ({
    keyword: "",
    params: {
      dongCode: "",
    },
    aptList: [],
  }),
  getters: {
    getKeyword(state) {
      return state.keyword;
    },
    getAptList(state) {
      return state.aptList;
    },
  },
  actions: {
    async changeRegcode(keyword) {
      await keywordToReg(
        keyword.value,
        ({ data }) => {
          console.log("chage regcode");
          console.log(keyword.value);
          this.keyword = keyword.value;
          this.params.dongCode = data;
          this.setAptList(this.params);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async setAptList(params) {
      await searchApt(
        params,
        ({ data }) => {
          this.aptList = data;
        },
        (error) => {
          console.log(error);
        }
      );
    },

    resetAptList() {
      this.aptList = [];
    },
  },
});
