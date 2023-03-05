import axios from "axios";
import Cookies from "js-cookie";
import { defineStore } from "pinia";

export const useBrandStore = defineStore("brand", {
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
      businessName: "",
      brn: "",
      introduction: "",
    },
    customerAllCardsBrandsAsc: [],
    currentBrand: {
      id: "",
      userId: "",
      user: {
        image: {
          url: "",
        },
        place: {
          zipcode: "",
          basic: "",
          detail: "",
        },
      },
      businessName: "",
      brn: "",
      introduction: "",
    },
    currentBrandId: "",
  }),
  getters: {
    brandProfile(state) {
      return state.profile;
    },
    brandCustomerAllCardsBrandsAsc(state) {
      return state.customerAllCardsBrandsAsc;
    },
    brandCurrentBrand(state) {
      return state.currentBrand;
    },
    brandCurrentBrandId(state) {
      return state.currentBrandId;
    },
  },
  actions: {
    setProfile(profile) {
      this.profile = profile;
    },
    setCustomerAllCardsBrandsAsc(customerAllCardsBrandsAsc) {
      this.customerAllCardsBrandsAsc = customerAllCardsBrandsAsc;
    },
    setCurrentBrand(currentBrand) {
      this.currentBrand = currentBrand;
    },
    setCurrentBrandId(currentBrandId) {
      this.currentBrandId = currentBrandId;
    },
    async getBrandProfile() {
      console.log(`++++++ [brand.js] getBrandProfile() ++++++`);
      const axiosResult = await axios
        .get(`/api/brands/profile`)
        .catch((err) => {
          console.error(`❯❯❯❯❯❯ [brand.js] getBrandProfile() err:`, err);
        });
      console.log(
        `❯❯❯❯❯❯ [brand.js] getBrandProfile() axiosResult:`,
        axiosResult
      );
      this.profile = axiosResult.data;
      console.log(
        `❯❯❯❯❯❯ [brand.js] getBrandProfile() this.profile:`,
        this.profile
      );
      return this.brandProfile;
    },
    async loadCustomerAllCardsBrandsAsc() {
      console.log(`++++++ [brand.js] loadCustomerAllCardsBrandsAsc() ++++++`);
      let result = {};
      await axios
        .get(`/api/brands/list-asc`)
        .then((res) => {
          result = res.data;
        })
        .catch((err) => {
          console.error(
            `❯❯❯❯❯❯ [brand.js] loadCustomerAllCardsBrandsAsc() err:`,
            err
          );
        });
      return result;
    },
    async detailBrand(id) {
      const axiosResult = await axios
        .get(`/api/brands/detail/${id}`)
        .catch((err) => {
          console.error(`❯❯❯❯❯❯ [brand.js] detailBrand() err:`, err);
        });
      this.currentBrand = axiosResult.data;
    },
    async brandLogout() {
      console.log(`++++++ [brand.js] brandLogout() ++++++`);
      const axiosResult = await axios.get(`/api/auth/logout`).catch((err) => {
        console.error(`❯❯❯❯❯❯ [brand.js] brandLogout() err:`, err);
      });
      console.log(`❯❯❯❯❯❯ [brand.js] brandLogout() axiosResult:`, axiosResult);
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
        businessName: "",
        brn: "",
        introduction: "",
      };
      this.setProfile(profile);
    },
    async updateBrand(reqUpdateBrandDto) {
      let result = {};
      await axios
        .put(`/api/brands`, reqUpdateBrandDto)
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
  // persist: true,
  // persist: {
  //   storage: sessionStorage,
  // },
});
