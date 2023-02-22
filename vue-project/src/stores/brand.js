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
    },
    tickets: []
  }),
  getters: {
    brandProfile(state) {
      return state.profile;
    },
    brandTickets(state) {
      return state.tickets
    }
  },
  actions: {
    async getBrandProfile() {
      console.log(`++++++ [brand.js] getBrandProfile() ++++++`);
      const axiosResult = await axios.get(`/api/brands/profile`)
        .catch((err) => {
          console.error(`❯❯❯❯❯❯ [brand.js] getBrandProfile() err:`, err);
        });
      console.log(`❯❯❯❯❯❯ [brand.js] getBrandProfile() axiosResult:`, axiosResult);
      this.profile = axiosResult.data;
      console.log(`❯❯❯❯❯❯ [brand.js] getBrandProfile() this.profile:`, this.profile);
    },
    async getBrandTickets() {
      console.log(`++++++ [brand.js] getBrandTickets() ++++++`);
      const axiosResult = await axios.get(`/api/tickets/brand/`)
        .catch((err) => {
          console.error(`❯❯❯❯❯❯ [brand.js] getBrandTickets() err:`, err);
        });
      this.tickets = axiosResult.data;
      console.log(`❯❯❯❯❯❯ [brand.js] getBrandTickets() this.tickets:`, this.tickets);
    }
  }
})