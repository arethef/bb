import axios from "axios";
import { defineStore } from "pinia";

export const useOrderStore = defineStore("order", {
  state: () => ({}),
  getters: {},
  actions: {
    async insertOrders(marketId, orders) {
      console.log(`++++++ [order.js] insertOrders() ++++++`);
      let result = {};
      const reqCreateOrderDto = {
        marketId,
        orders,
      };
      await axios
        .post(`/api/orders/`, reqCreateOrderDto)
        .then((res) => {
          console.log(`❯❯❯❯❯❯ [order.js] insertOrders() res:`, res);
          result = res.data;
        })
        .catch((err) => {
          console.error(`❯❯❯❯❯❯ [order.js] insertOrders() err:`, err);
        });
      return result;
    },
  },
});
