import axios from "axios";
import { defineStore } from "pinia";
import { useImageStore } from "./image";
import { useLineupStore } from "./lineup";

const imageStore = useImageStore();
const lineupStore = useLineupStore();

export const useMarketStore = defineStore("market", {
  state: () => ({
    currentMarket: {
      id: "",
      createdAt: "",
      updatedAt: "",
      deletedAt: "",
      version: 0,
      un: "",
      brandId: "",
      brand: {},
      title: "",
      content: "",
      imageId: "",
      image: {},
      deliveryFee: 0,
      deliveryFeeAdded: 0,
      deliveryFree: 0,
      minimumQuantity: 0,
      openDateTime: null,
      closeDateTime: null,
    },
    currentMarketId: "",
    brandAllTableMarkets: [],
    brandProductDetailMarkets: [],
  }),
  getters: {
    marketCurrentMarket(state) {
      return state.currentMarket;
    },
    marketCurrentMarketId(state) {
      return state.currentMarketId;
    },
    marketBrandAllTableMarkets(state) {
      return state.brandAllTableMarkets;
    },
    marketBrandProductDetailMarkets(state) {
      return state.brandProductDetailMarkets;
    },
  },
  actions: {
    setCurrentMarket(currentMarket) {
      this.currentMarket = currentMarket;
    },
    setCurrentMarketId(currentMarketId) {
      this.currentMarketId = currentMarketId;
    },
    setBrandAllTableMarkets(brandAllTableMarkets) {
      this.brandAllTableMarkets = brandAllTableMarkets;
    },
    setBrandProductDetailMarkets(brandProductDetailMarkets) {
      this.brandProductDetailMarkets = brandProductDetailMarkets;
    },
    async createMarket(reqCreateMarketDto) {
      console.log(`++++++ [market.js] createMarket() ++++++`);
      const imageId = await imageStore.uploadImage(
        reqCreateMarketDto.image.formData
      );
      const dto = {
        market: { ...reqCreateMarketDto.market },
        image: { imageId },
      };
      console.log(`❯❯❯❯❯❯ [market.js] createMarket() dto:`, dto);
      let result = {};
      await axios
        .post(`/api/markets/new`, dto)
        .then((res) => {
          console.log(`❯❯❯❯❯❯ [market.js] createMarket() res.data:`, res.data);
          result = res.data;
        })
        .catch((err) => {
          console.log(`❯❯❯❯❯❯ [market.js] createMarket() err:`, err);
        });
      const { lineups } = reqCreateMarketDto;
      await lineupStore.insertLineups(result.id, lineups);
      return result;
    },
    async detailMarket(id) {
      console.log(`++++++ [market.js] detailMarket() ++++++`);
      console.log(`❯❯❯❯❯❯ [market.js] detailMarket() id:`, id);
      const axiosResult = await axios
        .get(`/api/markets/detail/${id}`)
        .catch((err) => {
          console.error(`❯❯❯❯❯❯ [market.js] detailMarket() err:`, err);
        });
      this.currentMarket = axiosResult.data;
      console.log(
        `❯❯❯❯❯❯ [market.js] detailMarket() this.currentMarket:`,
        this.currentMarket
      );
    },
    async loadBrandAllTableMarkets() {
      console.log(`++++++ [market.js] loadBrandAllTableMarkets() ++++++`);
      let result = {};
      await axios
        .get(`/api/markets/brand-market-list`)
        .then((res) => {
          result = res.data;
        })
        .catch((err) => {
          console.error(
            `❯❯❯❯❯❯ [market.js] loadBrandAllTableMarkets() err:`,
            err
          );
        });
      return result;
    },
    async loadBrandProductDetailMarkets(productId) {
      console.log(`++++++ [market.js] loadBrandProductDetailMarkets() ++++++`);
      let result = {};
      await axios
        .get(`/api/markets/brand-product-detail-market-list/${productId}`)
        .then((res) => {
          result = res.data;
        })
        .catch((err) => {
          console.error(
            `❯❯❯❯❯❯ [market.js] loadBrandProductDetailMarkets() err:`,
            err
          );
        });
      return result;
    },
  },
});
