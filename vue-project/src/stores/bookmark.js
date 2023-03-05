import axios from "axios";
import { defineStore } from "pinia";

export const useBookmarkStore = defineStore("bookmark", {
  persist: true,
  state: () => ({
    currentBookmarks: [],
    currentBookmarksIdList: [],
    currentBookmarksProductIdList: [],
    currentBookmarksMarketIdList: [],
    currentBookmarksBrandIdList: [],
    currentBookmarksProduct: [],
    currentBookmarksMarket: [],
    currentBookmarksBrand: [],
  }),
  getters: {
    bookmarkCurrentBookmarks(state) {
      return state.currentBookmarks;
    },
    bookmarkCurrentBookmarksIdList(state) {
      return state.currentBookmarksIdList;
    },
    bookmarkCurrentBookmarksProductIdList(state) {
      return state.currentBookmarksProductIdList;
    },
    bookmarkCurrentBookmarksMarketIdList(state) {
      return state.currentBookmarksMarketIdList;
    },
    bookmarkCurrentBookmarksBrandIdList(state) {
      return state.currentBookmarksBrandIdList;
    },
    bookmarkCurrentBookmarksProduct(state) {
      return state.currentBookmarksProduct;
    },
    bookmarkCurrentBookmarksMarket(state) {
      return state.currentBookmarksMarket;
    },
    bookmarkCurrentBookmarksBrand(state) {
      return state.currentBookmarksBrand;
    },
  },
  actions: {
    setCurrentBookmarks(currentBookmarks) {
      this.currentBookmarks = currentBookmarks;
      this.currentBookmarksProduct = currentBookmarks.filter(
        (bookmark) => bookmark.product !== null
      );
      this.currentBookmarksProductIdList = this.currentBookmarksProduct.map(
        (bookmark) => bookmark.productId
      );
      this.currentBookmarksMarket = currentBookmarks.filter(
        (bookmark) => bookmark.market !== null
      );
      this.currentBookmarksMarketIdList = this.currentBookmarksMarket.map(
        (bookmark) => bookmark.marketId
      );
      this.currentBookmarksBrand = currentBookmarks.filter(
        (bookmark) => bookmark.brand !== null
      );
      this.currentBookmarksBrandIdList = this.currentBookmarksBrand.map(
        (bookmark) => bookmark.brandId
      );
    },
    async insertBookmarkProduct(productId) {
      let result = {};
      await axios
        .post(`/api/bookmarks/product/${productId}`)
        .then((res) => {
          result = res.data;
          console.log(
            `❯❯❯❯❯❯ [bookmark.js] insertBookmarkProduct() res.data:`,
            res.data
          );
        })
        .catch((err) => {
          console.error(
            `❯❯❯❯❯❯ [bookmark.js] insertBookmarkProduct() err:`,
            err
          );
        });
      return result;
    },
    async insertBookmarkMarket(marketId) {
      let result = {};
      await axios
        .post(`/api/bookmarks/market/${marketId}`)
        .then((res) => {
          result = res.data;
          console.log(
            `❯❯❯❯❯❯ [bookmark.js] insertBookmarkMarket() res.data:`,
            res.data
          );
        })
        .catch((err) => {
          console.error(
            `❯❯❯❯❯❯ [bookmark.js] insertBookmarkMarket() err:`,
            err
          );
        });
      return result;
    },
    async insertBookmarkBrand(brandId) {
      let result = {};
      await axios
        .post(`/api/bookmarks/brand/${brandId}`)
        .then((res) => {
          result = res.data;
        })
        .catch((err) => {
          console.error(`❯❯❯❯❯❯ [bookmark.js] insertBookmarkBrand() err:`, err);
        });
      return result;
    },
    async loadCurrentBookmarks() {
      let result = [];
      await axios
        .get(`/api/bookmarks/list`)
        .then((res) => {
          result = res.data;
        })
        .catch((err) => {
          console.error(
            `❯❯❯❯❯❯ [bookmark.js] loadCurrentBookmarks() err:`,
            err
          );
        });
      this.setCurrentBookmarks(result);
      return result;
    },
    async deleteBookmarkProduct(productId) {
      let result = {};
      await axios
        .delete(`/api/bookmarks/product/${productId}`)
        .then((res) => {
          result = res.data;
        })
        .catch((err) => {
          console.error(
            `❯❯❯❯❯❯ [bookmark.js] deleteBookmarkProduct() err:`,
            err
          );
        });
      await this.loadCurrentBookmarks();
      return result;
    },
    async deleteBookmarkMarket(marketId) {
      let result = {};
      await axios
        .delete(`/api/bookmarks/market/${marketId}`)
        .then((res) => {
          result = res.data;
        })
        .catch((err) => {
          console.error(
            `❯❯❯❯❯❯ [bookmark.js] deleteBookmarkMarket() err:`,
            err
          );
        });
      await this.loadCurrentBookmarks();
      return result;
    },
    async deleteBookmarkBrand(brandId) {
      let result = {};
      await axios
        .delete(`/api/bookmarks/brand/${brandId}`)
        .then((res) => {
          result = res.data;
        })
        .catch((err) => {
          console.error(`❯❯❯❯❯❯ [bookmark.js] deleteBookmarkBrand() err:`, err);
        });
      await this.loadCurrentBookmarks();
      return result;
    },
  },
});
