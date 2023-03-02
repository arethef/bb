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
    setProfile(profile) {
      this.profile = profile;
    },
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
      return this.customerProfile;
    },
    async customerLogout() {
      console.log(`++++++ [customer.js] customerLogout() ++++++`);
      const axiosResult = await axios.get(`/api/auth/logout`).catch((err) => {
        console.error(`❯❯❯❯❯❯ [customer.js] customerLogout() err:`, err);
      });
      console.log(
        `❯❯❯❯❯❯ [customer.js] customerLogout() axiosResult:`,
        axiosResult
      );
      this.clearProfile();
    },
    clearProfile() {
      const profile = {
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
      };
      this.setProfile(profile);
    },
    async updateCustomer(reqUpdateCustomerDto) {
      let result = {};
      await axios
        .put(`/api/customers`, reqUpdateCustomerDto)
        .then((res) => {
          result = res.data.result;
        })
        .catch((err) => {
          console.error(err);
        });
      this.setProfile(result);
      return result;
    },
  },
});
