import axios from "axios";
import { defineStore } from "pinia";

export const useCustomerStore = defineStore("customer", {
  state: () => ({
    profile: {
      id: "",
      userId: "",
      user: {
        id: "",
        createdAt: "",
        updatedAt: "",
        deletedAt: "",
        version: "",
        email: "",
        password: "",
        username: "",
        roleId: "",
        role: {},
        imageId: "",
        image: {
          id: "",
          url: "",
        },
        placeId: "",
        place: {
          id: "",
          zipcode: "",
          basic: "",
          detail: "",
        },
      },
      nickname: "",
    },
  }),
  getters: {
    customerProfile(state) {
      return state.profile;
    },
  },
  actions: {
    async getCustomerProfile() {
      console.log(`++++++ [customer.js] getCustomerProfile() ++++++`);
      const axiosResult = await axios
        .get(`/api/customers/profile`)
        .catch((err) => {
          console.error(`❯❯❯❯❯❯ [customer.js] getCustomerProfile() err:`, err);
        });
      console.log(
        `❯❯❯❯❯❯ [customer.js] getCustomerProfile() axiosResult:`,
        axiosResult
      );
      this.profile = axiosResult.data;
      console.log(
        `❯❯❯❯❯❯ [customer.js] getCustomerProfile() this.profile:`,
        this.profile
      );
    },
  },
});
