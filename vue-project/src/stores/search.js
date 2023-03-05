import axios from "axios";
import { defineStore } from "pinia";

export const useSearchStore = defineStore("search", {
  state: () => ({
    markets: [],
    brands: [],
    products: [],
  }),
  getters: {
    searchMarkets(state) {
      return state.markets;
    },
    searchBrands(state) {
      return state.brands;
    },
    searchProducts(state) {
      return state.products;
    },
  },
  actions: {
    setMarkets(markets) {
      this.markets = markets;
    },
    setBrands(brands) {
      this.brands = brands;
    },
    setProducts(products) {
      this.products = products;
    },
    async loadSearchResult(searchStr) {
      console.log(`++++++ [search.js] loadSearchResult() ++++++`);
      await this.loadSearchMarketsResult(searchStr);
      await this.loadSearchBrandsResult(searchStr);
      await this.loadSearchProductsResult(searchStr);
    },
    async loadSearchMarketsResult(searchStr) {
      console.log(`++++++ [search.js] loadSearchMarketsResult() ++++++`);
      let result = {};
      await axios
        .get(`/api/markets/search/${searchStr}`)
        .then((res) => {
          result = res.data;
        })
        .catch((err) => {
          console.error(
            `❯❯❯❯❯❯ [search.js] loadSearchMarketsResult() err:`,
            err
          );
        });
      this.setMarkets(result);
    },
    async loadSearchBrandsResult(searchStr) {
      console.log(`++++++ [search.js] loadSearchBrandsResult() ++++++`);
      let result = {};
      await axios
        .get(`/api/brands/search/${searchStr}`)
        .then((res) => {
          result = res.data;
        })
        .catch((err) => {
          console.error(
            `❯❯❯❯❯❯ [search.js] loadSearchBrandsResult() err:`,
            err
          );
        });
      this.setBrands(result);
    },
    async loadSearchProductsResult(searchStr) {
      console.log(`++++++ [search.js] loadSearchProductsResult() ++++++`);
      let result = {};
      await axios
        .get(`/api/products/search/${searchStr}`)
        .then((res) => {
          result = res.data;
        })
        .catch((err) => {
          console.error(
            `❯❯❯❯❯❯ [search.js] loadSearchProductsResult() err:`,
            err
          );
        });
      this.setProducts(result);
    },
  },
});
