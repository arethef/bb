import axios from "axios";
import { defineStore } from "pinia";

export const useLinkStore = defineStore("link", {
  state: () => ({
    currentLinks: [],
  }),
  getters: {
    linkCurrentLinks(state) {
      return state.currentLinks;
    },
  },
  actions: {
    setLinkCurrentLinks(currentLinks) {
      this.currentLinks = currentLinks;
    },
    async insertLinks(reqInsertLinksDto) {
      console.log(`++++++ [link.js] insertLinks() ++++++`);
      let result = {};
      await axios
        .post(`/api/links/`, reqInsertLinksDto)
        .then((res) => {
          console.log(`❯❯❯❯❯❯ [link.js] insertLinks() res.data:`, res.data);
          result = res.data;
        })
        .catch((err) => {
          console.error(`❯❯❯❯❯❯ [link.js] insertLinks() err:`, err);
        });
      return result;
    },
    async deleteLinks(delLinkIds) {
      let result = {};
      await axios
        .post(`/api/links/delete`, delLinkIds)
        .then((res) => {
          console.log(`❯❯❯❯❯❯ [link.js] deleteLinks() res.data:`, res.data);
          result = res.data;
        })
        .catch((err) => {
          console.error(`❯❯❯❯❯❯ [link.js] deleteLinks() err:`, err);
        });
      return result;
    },
    async loadLinks(brandId) {
      let result = {};
      await axios
        .get(`/api/links/list/${brandId}`)
        .then((res) => {
          result = res.data;
        })
        .catch((err) => {
          console.error(`❯❯❯❯❯❯ [link.js] loadLinks() err:`, err);
        });
      this.setLinkCurrentLinks(result);
      return result;
    },
  },
});
