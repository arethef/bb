import axios from "axios";
import { defineStore } from "pinia";

export const useImageStore = defineStore('image', {
  state: () => ({

  }),
  getters: {

  },
  actions: {
    async uploadImage(formData) {
      console.log(`++++++ [image.js] uploadImage() ++++++`);
      let result = {}
      const headers = {
        'Content-Type': 'multipart/formdata'
      };
      await axios.post(`/api/images/upload-disk-destination`, formData, { headers })
        .then((res) => {
          console.log(`❯❯❯❯❯❯ [image.js] uploadImage() res:`, res)
          result = res.data;
        })
        .catch((err) => {
          console.error(`❯❯❯❯❯❯ [image.js] uploadImage() err:`, err);
        });
      return result.image.id;
    },
  }
})