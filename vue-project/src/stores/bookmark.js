import axios from "axios";
import { defineStore } from "pinia";

export const useBookmarkStore = defineStore("bookmark", {
  state: () => ({
    currentBookmarks: [],
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
        (bookmark) => bookmark.target.product !== null
      );
      this.currentBookmarksProductIdList = this.currentBookmarksProduct.map(
        (bookmark) => bookmark.target.productId
      );
      this.currentBookmarksMarket = currentBookmarks.filter(
        (bookmark) => bookmark.target.market !== null
      );
      this.currentBookmarksMarketIdList = this.currentBookmarksMarket.map(
        (bookmark) => bookmark.target.marketId
      );
      this.currentBookmarksBrand = currentBookmarks.filter(
        (bookmark) => bookmark.target.brand !== null
      );
      this.currentBookmarksBrandIdList = this.currentBookmarksBrand.map(
        (bookmark) => bookmark.target.brandId
      );
    },
    // setCurrentBookmarksProductIdList(currentBookmarksProductIdList) {
    //   this.currentBookmarksProductIdList = currentBookmarksProductIdList;
    // },
    // setCurrentBookmarksMarketIdList(currentBookmarksMarketIdList) {
    //   this.currentBookmarksMarketIdList = currentBookmarksMarketIdList;
    // },
    // setCurrentBookmarksBrandIdList(currentBookmarksBrandIdList) {
    //   this.currentBookmarksBrandIdList = currentBookmarksBrandIdList;
    // },
    // setCurrentBookmarksProduct(currentBookmarksProduct) {
    //   this.currentBookmarksProduct = currentBookmarksProduct;
    // },
    // setCurrentBookmarksMarket(currentBookmarksMarket) {
    //   this.currentBookmarksMarket = currentBookmarksMarket;
    // },
    // setCurrentBookmarksBrand(currentBookmarksBrand) {
    //   this.currentBookmarksBrand = currentBookmarksBrand;
    // },
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
    // async loadCurrentBookmarksProduct() {
    //   const result = {};
    //   await axios
    //     .get(`/api/bookmarks/list-product`)
    //     .then((res) => {
    //       result = res.data;
    //     })
    //     .catch((err) => {
    //       console.error(
    //         `❯❯❯❯❯❯ [bookmark.js] loadCurrentBookmarksProduct() err:`,
    //         err
    //       );
    //     });
    //   this.setCurrentBookmarksProduct(result);
    //   const idListResult = result.map((bookmark) => bookmark.target.productId);
    //   this.setCurrentBookmarksProductIdList(idListResult);
    //   return result;
    // },
    // async loadCurrentBookmarksMarket() {
    //   const result = {};
    //   await axios
    //     .get(`/api/bookmarks/list-market`)
    //     .then((res) => {
    //       result = res.data;
    //     })
    //     .catch((err) => {
    //       console.error(
    //         `❯❯❯❯❯❯ [bookmark.js] loadCurrentBookmarksMarket() err:`,
    //         err
    //       );
    //     });
    //   this.setCurrentBookmarksMarket(result);
    //   const idListResult = result.map((bookmark) => bookmark.target.marketId);
    //   this.setCurrentBookmarksMarketIdList(idListResult);
    //   return result;
    // },
    // async loadCurrentBookmarksBrand() {
    //   const result = {};
    //   await axios
    //     .get(`/api/bookmarks/list-brand`)
    //     .then((res) => {
    //       result = res.data;
    //     })
    //     .catch((err) => {
    //       console.error(
    //         `❯❯❯❯❯❯ [bookmark.js] loadCurrentBookmarksBrand() err:`,
    //         err
    //       );
    //     });
    //   this.setCurrentBookmarksBrand(result);
    //   const idListResult = result.map((bookmark) => bookmark.target.brandId);
    //   this.setCurrentBookmarksBrandIdList(idListResult);
    //   return result;
    // },
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
