import axios from "axios";
import { defineStore } from "pinia";

export const useBrandStore = defineStore('brand', {
  state: () => ({
    profile: {
      id: "",
      userId: "",
      user: {},
      businessName: "",
      brn: "",
      introduction:"",
    }
  }),
  getters: {
    brandProfile(state) {
      return state.profile;
    }
  },
  actions: {
    async getBrand() {
      console.log(`++++++ [brand.js] getBrand() ++++++`);
      const axiosResult = await axios.get(`/api/brands/profile`)
        .catch((err) => {
          console.error(`❯❯❯❯❯❯ [brand.js] getBrand() err:`, err);
        });
      console.log(`❯❯❯❯❯❯ [brand.js] getBrand() axiosResult:`, axiosResult);
      this.profile = axiosResult.data;
      console.log(`❯❯❯❯❯❯ [brand.js] getBrand() this.profile:`, this.profile);
    }
  }
})