import { defineStore } from "pinia";
import bootstrap from "bootstrap/dist/js/bootstrap.min.js";

export default useAppStore = defineStore("storeId", {
  state: () => ({
    // bootstrap: bootstrap,
  }),

  persist: { enabled: true },
  // plugins: [
  //     createPersistedState({
  //         // 브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
  //         storage: sessionStorage,
  //     }),
  // ],
});
