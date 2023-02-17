import axios from "axios";
import { defineStore } from "pinia";

export const useCustomerStore = defineStore('customer', {
  state: () => ({
    customer: {
      id: "",
      userId: "",
      user: {},
      nickname:"",
    }
  }),
  getters: {

  },
  actions: {
    async getCustomer() {
      console.log(`++++++ [customer.js] getCustomer() ++++++`);
      const axiosResult = await axios.get(`/api/customers/profile`)
        .catch((err) => {
          console.error(`❯❯❯❯❯❯ [customer.js] getCustomer() err:`, err);
        });
      console.log(`❯❯❯❯❯❯ [customer.js] getCustomer() axiosResult:`, axiosResult);
    }
  }
})