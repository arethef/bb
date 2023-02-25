import axios from "axios";
import { defineStore } from "pinia";

export const useLineupStore = defineStore("lineup", {
  state: () => ({
    currentLineups: [],
  }),
  getters: {
    lineupCurrentLineups(state) {
      return state.currentLineups;
    },
  },
  actions: {
    setLineupCurrentLineups(currentLineups) {
      this.currentLineups = currentLineups;
    },
    async insertLineups(marketId, lineups) {
      console.log(`++++++ [lineup.js] insertLineups() ++++++`);
      let result = {};
      const reqCreateLineupDto = {
        marketId,
        lineups,
      };
      await axios
        .post(`/api/lineups/`, reqCreateLineupDto)
        .then((res) => {
          console.log(`❯❯❯❯❯❯ [lineup.js] insertLineups() res:`, res);
          result = res.data;
        })
        .catch((err) => {
          console.error(`❯❯❯❯❯❯ [lineup.js] insertLineups() err:`, err);
        });
      return result;
    },
    async loadLineups(marketId) {
      console.log(`++++++ [lineup.js] loadLineups() ++++++`);
      let result = {};
      await axios
        .get(`/api/lineups/${marketId}`)
        .then((res) => {
          console.log(`❯❯❯❯❯❯ [lineup.js] loadLineups() res:`, res);
          result = res.data;
        })
        .catch((err) => {
          console.error(`❯❯❯❯❯❯ [lineup.js] loadLineups() err:`, err);
        });
      this.currentLineups = result;
      return result;
    },
  },
});
