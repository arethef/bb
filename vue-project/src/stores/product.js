import axios from "axios";
import { defineStore } from "pinia";

export const useProductStore = defineStore("product", {
  state: () => ({
    currentProduct: {
      id: "",
      un: "",
      createdAt: "",
      updatedAt: "",
      deletedAt: "",
      version: 0,
      name: "",
      description: "",
      price: 0,
      brand: {},
      brandId: "",
      image: {},
      imageId: "",
    },
    currentProductId: "",
    allTableProducts: [],
    brandMarketNewProducts: [],
    brandMarketNewLineups: [],
    customerTicketNewOrders: [],
    customerBrandDetailProducts: [],
    customerTicketDetailProducts: [],
    brandTicketDetailProducts: [],
  }),
  getters: {
    productCurrentProduct(state) {
      return state.currentProduct;
    },
    productCurrentProductId(state) {
      return state.currentProductId;
    },
    productAllTableProducts(state) {
      return state.allTableProducts;
    },
    productBrandMarketNewProducts(state) {
      return state.brandMarketNewProducts;
    },
    productBrandMarketNewLineups(state) {
      return state.brandMarketNewLineups;
    },
    productCustomerTicketNewOrders(state) {
      return state.customerTicketNewOrders;
    },
    productCustomerBrandDetailProducts(state) {
      return state.customerBrandDetailProducts;
    },
    productCustomerTicketDetailProducts(state) {
      return state.customerTicketDetailProducts;
    },
    productBrandTicketDetailProducts(state) {
      return state.brandTicketDetailProducts;
    },
  },
  actions: {
    setCurrentProductId(currentProductId) {
      this.currentProductId = currentProductId;
    },
    setCurrentProduct(currentProduct) {
      this.currentProduct = currentProduct;
    },
    setAllTableProducts(allTableProducts) {
      this.allTableProducts = allTableProducts;
    },
    setBrandMarketNewProducts(brandMarketNewProducts) {
      this.brandMarketNewProducts = brandMarketNewProducts;
    },
    setBrandMarketNewLineups(brandMarketNewLineups) {
      this.brandMarketNewLineups = brandMarketNewLineups;
    },
    setCustomerTicketNewOrders(customerTicketNewOrders) {
      this.customerTicketNewOrders = customerTicketNewOrders;
    },
    setCustomerBrandDetailProducts(customerBrandDetailProducts) {
      this.customerBrandDetailProducts = customerBrandDetailProducts;
    },
    setCustomerTicketDetailProducts(customerTicketDetailProducts) {
      this.customerTicketDetailProducts = customerTicketDetailProducts;
    },
    setBrandTicketDetailProducts(brandTicketDetailProducts) {
      this.brandTicketDetailProducts = brandTicketDetailProducts;
    },
    async createProduct(reqCreateProductDto) {
      console.log(`++++++ [product.js] createProduct() ++++++`);
      let result = {};
      await axios
        .post(`/api/products`, reqCreateProductDto)
        .then((res) => {
          // console.log(`❯❯❯❯❯❯ [product.js] createProduct() res:`, res);
          console.log(
            `❯❯❯❯❯❯ [product.js] createProduct() res.data:`,
            res.data
          );
          result = res.data;
        })
        .catch((err) => {
          console.log(`❯❯❯❯❯❯ [product.js] createProduct() err:`, err);
        });
      return result;
    },
    async detailProduct(id) {
      console.log(`++++++ [product.js] detailProduct() ++++++`);
      console.log(`❯❯❯❯❯❯ [product.js] detailProduct() id:`, id);
      const axiosResult = await axios
        .get(`/api/products/detail/${id}`)
        .catch((err) => {
          console.error(`❯❯❯❯❯❯ [product.js] detailProduct() err:`, err);
        });
      this.currentProduct = axiosResult.data;
      console.log(
        `❯❯❯❯❯❯ [product.js] detailProduct() this.currentProduct:`,
        this.currentProduct
      );
    },
    async loadProducts() {
      console.log(`++++++ [product.js] loadProducts() ++++++`);
      let result = {};
      await axios
        .get(`/api/products/table-list`)
        .then((res) => {
          // console.log(`❯❯❯❯❯❯ [product.js] loadProducts() res:`, res);
          console.log(`❯❯❯❯❯❯ [product.js] loadProducts() res.data:`, res.data);
          result = res.data;
        })
        .catch((err) => {
          console.log(`❯❯❯❯❯❯ [product.js] loadProducts() err:`, err);
        });
      return result;
    },
    async loadMarketNewProducts() {
      console.log(`++++++ [product.js] loadMarketNewProducts() ++++++`);
      let result = {};
      await axios
        .get(`/api/products/list-market-new-products`)
        .then((res) => {
          console.log(
            `❯❯❯❯❯❯ [product.js] loadMarketNewProducts() res.data:`,
            res.data
          );
          result = res.data;
        })
        .catch((err) => {
          console.error(
            `❯❯❯❯❯❯ [product.js] loadMarketNewProducts() err:`,
            err
          );
        });
      return result;
    },
    async loadMarketNewLineups(marketNewLineups) {
      console.log(`++++++ [product.js] loadMarketNewLineups() ++++++`);
      let result = {};
      await axios
        .post(`/api/products/list-market-new-lineups`, marketNewLineups)
        .then((res) => {
          console.log(
            `❯❯❯❯❯❯ [product.js] loadMarketNewLineups() res.data:`,
            res.data
          );
          result = res.data;
        })
        .catch((err) => {
          console.error(`❯❯❯❯❯❯ [product.js] loadMarketNewLineups() err:`, err);
        });
      return result;
    },
    async loadTicketNewOrders(ticketNewOrders) {
      console.log(`++++++ [product.js] loadTicketNewOrders() ++++++`);
      let result = {};
      await axios
        .post(`/api/products/list-ticket-new-orders`, ticketNewOrders)
        .then((res) => {
          console.log(
            `❯❯❯❯❯❯ [product.js] loadTicketNewOrders() res.data:`,
            res.data
          );
          result = res.data;
        })
        .catch((err) => {
          console.error(`❯❯❯❯❯❯ [product.js] loadTicketNewOrders() err:`, err);
        });
      return result;
    },
    async loadCustomerBrandDetailProducts(brandId) {
      let result = {};
      await axios
        .get(`/api/products/customer-brand-detail-list/${brandId}`)
        .then((res) => {
          result = res.data;
        })
        .catch((err) => {
          console.error(
            `❯❯❯❯❯❯ [product.js] loadCustomerBrandDetailProducts() err:`,
            err
          );
        });
      // this.customerBrandDetailProducts = result;
      this.setCustomerBrandDetailProducts(result);
      return result;
    },
    async loadCustomerTicketDetailProducts(ticketId) {
      let result = {};
      await axios
        .get(`/api/products/customer-ticket-detail-list/${ticketId}`)
        .then((res) => {
          result = res.data;
        })
        .catch((err) => {
          console.error(
            `❯❯❯❯❯❯ [product.js] loadCustomerTicketDetailProducts() err:`,
            err
          );
        });
      this.setCustomerTicketDetailProducts(result);
      return result;
    },
    async loadBrandTicketDetailProducts(ticketId) {
      let result = {};
      await axios
        .get(`/api/products/brand-ticket-detail-list/${ticketId}`)
        .then((res) => {
          result = res.data;
        })
        .catch((err) => {
          console.error(
            `❯❯❯❯❯❯ [product.js] loadBrandTicketDetailProducts() err:`,
            err
          );
        });
      this.setBrandTicketDetailProducts(result);
      return result;
    },
  },
});
