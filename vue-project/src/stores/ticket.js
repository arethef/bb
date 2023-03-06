import axios from "axios";
import { defineStore } from "pinia";
import { useOrderStore } from "./order";

const orderStore = useOrderStore();

export const useTicketStore = defineStore("ticket", {
  state: () => ({
    currentTicket: {
      id: "",
      createdAt: "",
      updatedAt: "",
      deletedAt: "",
      version: "",
      un: "",
      customerId: "",
      customer: {
        id: "",
        userId: "",
        user: {
          id: "",
          createdAt: "",
          updatedAt: "",
          deletedAt: "",
          version: "",
          email: "",
          password: "",
          username: "",
          roleId: "",
          role: {},
          imageId: "",
          image: {
            id: "",
            url: "",
          },
          placeId: "",
          place: {
            id: "",
            zipcode: "",
            basic: "",
            detail: "",
          },
        },
        nickname: "",
      },
      brandId: "",
      brand: {
        id: "",
        userId: "",
        user: {
          id: "",
          createdAt: "",
          updatedAt: "",
          deletedAt: "",
          version: "",
          email: "",
          password: "",
          username: "",
          roleId: "",
          role: {},
          imageId: "",
          image: {
            id: "",
            url: "",
          },
          placeId: "",
          place: {
            id: "",
            zipcode: "",
            basic: "",
            detail: "",
          },
        },
        businessName: "",
        brn: "",
        introduction: "",
      },
      marketId: "",
      market: {
        id: "",
        createdAt: "",
        updatedAt: "",
        deletedAt: "",
        version: "",
        un: "",
        brandId: "",
        brand: {
          id: "",
          userId: "",
          user: {
            id: "",
            createdAt: "",
            updatedAt: "",
            deletedAt: "",
            version: "",
            email: "",
            password: "",
            username: "",
            roleId: "",
            role: {},
            imageId: "",
            image: {
              id: "",
              url: "",
            },
            placeId: "",
            place: {
              id: "",
              zipcode: "",
              basic: "",
              detail: "",
            },
          },
          businessName: "",
          brn: "",
          introduction: "",
        },
        title: "",
        content: "",
        imageId: "",
        image: {
          id: "",
          url: "",
        },
        deliveryFee: 0,
        deliveryFeeAdded: 0,
        deliveryFree: 0,
        minimumQuantity: 0,
        openDateTime: null,
        closeDateTime: null,
      },
      totalQuantity: 0,
      totalPrice: 0,
      deliveryFreeApply: false,
      deliveryAddress: "",
      deliveryStatus: "",
    },
    currentTicketId: "",
    brandMarketDetailTickets: [],
    brandAllTableTickets: [],
    customerTickets: [],
  }),
  getters: {
    ticketCurrentTicket(state) {
      return state.currentTicket;
    },
    ticketCurrentTicketId(state) {
      return state.currentTicketId;
    },
    ticketBrandMarketDetailTickets(state) {
      return state.brandMarketDetailTickets;
    },
    ticketBrandAllTableTickets(state) {
      return state.brandAllTableTickets;
    },
    ticketCustomerTickets(state) {
      return state.customerTickets;
    },
  },
  actions: {
    setCurrentTicket(currentTicket) {
      this.currentTicket = currentTicket;
    },
    setCurrentTicketId(currentTicketId) {
      this.currentTicketId = currentTicketId;
    },
    setBrandMarketDetailTickets(brandMarketDetailTickets) {
      this.brandMarketDetailTickets = brandMarketDetailTickets;
    },
    setBrandAllTableTickets(brandAllTableTickets) {
      this.brandAllTableTickets = brandAllTableTickets;
    },
    setCustomerTickets(customerTickets) {
      this.customerTickets = customerTickets;
    },
    async createTicket(reqCreateTicketDto) {
      console.log(`++++++ [ticket.js] reqCreateTicketDto() ++++++`);
      let result = {};
      const dto = { ticket: { ...reqCreateTicketDto.ticket } };
      await axios
        .post(`/api/tickets/new`, dto)
        .then((res) => {
          console.log(`❯❯❯❯❯❯ [ticket.js] createTicket() res:`, res);
          result = res.data;
        })
        .catch((err) => {
          console.error(`❯❯❯❯❯❯ [ticket.js] createTicket() err:`, err);
        });
      const { orders } = reqCreateTicketDto;
      await orderStore.insertOrders(result.id, orders);
      return result;
    },
    async loadBrandMarketDetailTickets(marketId) {
      console.log(`++++++ [ticket.js] loadBrandMarketDetailTickets() ++++++`);
      let result = {};
      await axios
        .get(`/api/tickets/brand-market-detail-ticket-list/${marketId}`)
        .then((res) => {
          console.log(
            `❯❯❯❯❯❯ [ticket.js] loadBrandMarketDetailTickets() res:`,
            res
          );
          result = res.data;
        })
        .catch((err) => {
          console.error(
            `❯❯❯❯❯❯ [ticket.js] loadBrandMarketDetailTickets() err:`,
            err
          );
        });
      this.setBrandMarketDetailTickets(result);
      return result;
    },
    async loadBrandAllTableTickets() {
      console.log(`++++++ [ticket.js] loadBrandAllTableTickets() ++++++`);
      let result = {};
      await axios
        .get(`/api/tickets/brand-ticket-list`)
        .then((res) => {
          console.log(
            `❯❯❯❯❯❯ [ticket.js] loadBrandAllTableTickets() res.data:`,
            res.data
          );
          result = res.data;
        })
        .catch((err) => {
          console.error(
            `❯❯❯❯❯❯ [ticket.js] loadBrandAllTableTickets() err:`,
            err
          );
        });
      return result;
    },
    async loadCustomerTickets() {
      console.log(`++++++ [ticket.js] loadCustomerTickets() ++++++`);
      let result = {};
      await axios
        .get(`/api/tickets/customer-ticket-list`)
        .then((res) => {
          console.log(
            `❯❯❯❯❯❯ [ticket.js] loadCustomerTickets() res.data:`,
            res.data
          );
          result = res.data;
        })
        .catch((err) => {
          console.error(`❯❯❯❯❯❯ [ticket.js] loadCustomerTickets() err:`, err);
        });
      this.setCustomerTickets(result);
      return result;
    },
    async detailTicket(id) {
      const axiosResult = await axios
        .get(`/api/tickets/detail/${id}`)
        .catch((err) => {
          console.error(`❯❯❯❯❯❯ [ticket.js] detailTicket() err:`, err);
        });
      this.setCurrentTicket(axiosResult.data);
    },
    // async deleteTicket(id) {
    //   let result = {};
    //   await axios
    //     .delete(`/api/tickets/${id}`)
    //     .then((res) => {
    //       console.log(`❯❯❯❯❯❯ [ticket.js] deleteTicket() res.data:`, res.data);
    //       result = res.data;
    //     })
    //     .catch((err) => {
    //       console.error(`❯❯❯❯❯❯ [ticket.js] deleteTicket() err:`, err);
    //     });
    //   return result;
    // },
    async updatePayStatusFail(id) {
      let result = {};
      await axios
        .post(`/api/tickets/update/pay-status/fail/${id}`)
        .then((res) => {
          console.log(
            `❯❯❯❯❯❯ [ticket.js] updatePayStatusFail() res.data:`,
            res.data
          );
          result = res.data;
        })
        .catch((err) => {
          console.error(`❯❯❯❯❯❯ [ticket.js] updatePayStatusFail() err:`, err);
        });
      this.setCurrentTicket(result);
      return result;
    },
    async updatePayStatusSuccess(id) {
      let result = {};
      await axios
        .post(`/api/tickets/update/pay-status/success/${id}`)
        .then((res) => {
          console.log(
            `❯❯❯❯❯❯ [ticket.js] updatePayStatusSuccess() res.data:`,
            res.data
          );
          result = res.data;
        })
        .catch((err) => {
          console.error(
            `❯❯❯❯❯❯ [ticket.js] updatePayStatusSuccess() err:`,
            err
          );
        });
      this.setCurrentTicket(result);
      return result;
    },
  },
});
