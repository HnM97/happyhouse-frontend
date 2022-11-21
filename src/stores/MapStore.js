import { defineStore } from "pinia";
import { keywordToReg, searchApt } from "@/api/map.js";
export const useMapStore = defineStore("useMapStore", {
  state: () => ({
    keyword: "",
    params: {
      dongCode: "",
    },
    aptList: [],
  }),
  getters: {},
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
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
});