import axios from "axios";
import { defineStore } from "pinia";

export const useProductStore = defineStore('product', {
  state: () => ({
    currentProduct: {
      id: '',
      un: '',
      createdAt: '',
      updatedAt: '',
      deletedAt: '',
      version: 0,
      name: '',
      description: '',
      price: 0,
      brand: {},
      brandId: '',
      image: {},
      imageId: '',
    },
    currentProductId: '',
    allTableProducts: []
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
    }
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
    async createProduct(reqCreateProductDto) {
      console.log(`++++++ [product.js] createProduct() ++++++`);
      let result = {}
      await axios.post(`/api/products`, reqCreateProductDto)
        .then((res) => {
          // console.log(`❯❯❯❯❯❯ [product.js] createProduct() res:`, res);
          console.log(`❯❯❯❯❯❯ [product.js] createProduct() res.data:`, res.data);
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
      const axiosResult = await axios.get(`/api/products/detail/${id}`)
        .catch((err) => {
          console.error(`❯❯❯❯❯❯ [product.js] detailProduct() err:`, err);
        });
      this.currentProduct = axiosResult.data;
      console.log(`❯❯❯❯❯❯ [product.js] detailProduct() this.currentProduct:`, this.currentProduct);
      // let result = {}
      // await axios.get(`/api/products/detail/${id}`)
      //   .then((res) => {
      //     // console.log(`❯❯❯❯❯❯ [product.js] detailProduct() res:`, res);
      //     console.log(`❯❯❯❯❯❯ [product.js] detailProduct() res.data:`, res.data);
      //     result = res.data;
      //   })
      //   .catch((err) => {
      //     console.log(`❯❯❯❯❯❯ [product.js] detailProduct() err:`, err);
      //   });
      // return result;
    },
    async loadProducts() {
      console.log(`++++++ [product.js] loadProducts() ++++++`);
      let result = {}
      await axios.get(`/api/products/table-list`)
        .then((res) => {
          // console.log(`❯❯❯❯❯❯ [product.js] loadProducts() res:`, res);
          console.log(`❯❯❯❯❯❯ [product.js] loadProducts() res.data:`, res.data);
          result = res.data;
        })
        .catch((err) => {
          console.log(`❯❯❯❯❯❯ [product.js] loadProducts() err:`, err);
        });
      return result;
    }
  },
})