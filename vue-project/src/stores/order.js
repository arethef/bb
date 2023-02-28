import axios from "axios";
import { defineStore } from "pinia";

export const useOrderStore = defineStore("order", {
  state: () => ({
    currentOrders: [],
  }),
  getters: {
    orderCurrentOrders(state) {
      return state.currentOrders;
    },
  },
  actions: {
    setOrderCurrentOrders(currentOrders) {
      this.currentOrders = currentOrders;
    },
    async insertOrders(ticketId, orders) {
      console.log(`++++++ [order.js] insertOrders() ++++++`);
      let result = {};
      const reqCreateOrderDto = {
        ticketId,
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
    async loadCustomerTicketDetailOrders(ticketId) {
      let result = {};
      await axios
        .get(`/api/orders/customer-ticket-detail-order-list/${ticketId}`)
        .then((res) => {
          console.log(
            `❯❯❯❯❯❯ [order.js] loadCustomerTicketDetailOrders() res:`,
            res
          );
          result = res.data;
        })
        .catch((err) => {
          console.error(
            `❯❯❯❯❯❯ [order.js] loadCustomerTicketDetailOrders() err:`,
            err
          );
        });
      this.setOrderCurrentOrders(result);
      return result;
    },
  },
});
