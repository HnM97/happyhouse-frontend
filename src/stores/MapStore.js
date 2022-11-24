import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import { keywordToReg, searchApt, getBookmarkList } from "@/api/map.js";
export const useMapStore = defineStore("useMapStore", {
  persist: true,
  state: () => ({
    keyword: "",
    params: {
      dongCode: "",
    },
    aptList: [],
    selectedMarker: { marker: null, index: 0 },
    bookmark: false,
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
        keyword,
        ({ data }) => {
          console.log("change regcode");
          this.keyword = keyword;
          this.params.dongCode = data;
          this.setAptList(this.params);
          if (this.bookmark) {
            this.bookmark = false;
          }
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

    setMarker(marker, index) {
      console.log("set marker in store");
      console.log(marker);
      console.log(index);
      this.selectedMarker.marker = marker;
      this.selectedMarker.index = index;
    },

    async setBookmark(userId) {
      await getBookmarkList(
        userId,
        ({ data }) => {
          this.aptList = data;
        },
        (error) => {
          console.log(error);
        }
      );
      this.bookmark = true;
    },

    async resetBookmark() {
      console.log(this.keyword);
      await this.changeRegcode(this.keyword);
      this.bookmark = false;
    },
  },
});
