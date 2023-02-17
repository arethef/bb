import axios from "axios";
import { defineStore } from "pinia";

export const useBrandStore = defineStore('brand', {
  state: () => ({
    brand: {
      id: "",
      userId: "",
      user: {},
      businessName: "",
      brn: "",
      introduction:"",
    }
  }),
  getters: {

  },
  actions: {
    async getBrand() {
      console.log(`++++++ [brand.js] getBrand() ++++++`);
      const axiosResult = await axios.get(`/api/brands/profile`)
        .catch((err) => {
          console.error(`❯❯❯❯❯❯ [brand.js] getBrand() err:`, err);
        });
      console.log(`❯❯❯❯❯❯ [brand.js] getBrand() axiosResult:`, axiosResult);
    }
  }
})