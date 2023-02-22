import axios from "axios";
import { defineStore } from "pinia";

export const useTicketStore = defineStore('ticket', {
  state: () => ({
    tickets: []
  }),
  getters: {

  },
  actions: {
  }
})