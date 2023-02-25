import axios from "axios";
import { defineStore } from "pinia";

export const useTicketStore = defineStore("ticket", {
  state: () => ({
    tickets: [],
    currentMarketTickets: [],
  }),
  getters: {
    ticketCurrentMarketTickets(state) {
      return state.currentMarketTickets;
    },
  },
  actions: {
    setCurrentMarketTickets(currentMarketTickets) {
      this.currentMarketTickets = currentMarketTickets;
    },
    async loadMarketDetailTableTickets(marketId) {
      console.log(`++++++ [ticket.js] loadMarketDetailTableTickets() ++++++`);
      let result = {};
      await axios
        .get(`/api/tickets/market-detail/${marketId}`)
        .then((res) => {
          console.log(
            `❯❯❯❯❯❯ [ticket.js] loadMarketDetailTableTickets() res:`,
            res
          );
          result = res.data;
        })
        .catch((err) => {
          console.error(
            `❯❯❯❯❯❯ [ticket.js] loadMarketDetailTableTickets() err:`,
            err
          );
        });
      this.currentMarketTickets = result;
      return result;
    },
  },
});
