import qs from 'qs'
import axios from 'axios'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
  }),
  getters: {

  },
  actions: {
    async checkEmailExists(reqCheckEmailDto) {
      console.log(`++++++ [user.js] checkEmailExists() ++++++`);
      console.log(`❯❯❯❯❯❯ [user.js] checkEmailExists() reqCheckEmailDto:`, reqCheckEmailDto);
      let result = {}
      await axios.post(`/api/users/email-check`, reqCheckEmailDto)
        .then((res) => {
          console.log(`❯❯❯❯❯❯ [user.js] checkEmailExists() res.data:`, res.data);
          result = res.data;
        }).catch((err) => {
          console.error(err);
        });
      return result;
    },
    async checkBrnValidates(data) {
      console.log(`[user.js] checkBrnValidates()`);
      console.log(`❯❯❯❯❯❯ [user.js] checkBrnValidates() data:`, data);
      let result = {}
      await axios({
        method: 'post',
        url: `${import.meta.env.VITE_OPEN_API_BUSINESS_URL}${import.meta.env.VITE_OPEN_API_BUSINESS_ENCODING}`,
        headers: {
          "Authorization": `${import.meta.env.VITE_OPEN_API_BUSINESS_DECODING}`,
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        data
      }).then((res) => {
        console.log(`❯❯❯❯❯❯ [user.js] checkBrnValidates() res.data:`, res.data);
        console.log(`❯❯❯❯❯❯ [user.js] checkBrnValidates() res.data.data:`, res.data.data);
        console.log(`❯❯❯❯❯❯ [user.js] checkBrnValidates() res.data.data[0]:`, res.data.data[0]);
        result = res.data.data[0];
      }).catch((err) => {
        console.error(`❯❯❯❯❯❯ [user.js] checkBrnValidates() err:`, err);
      });
      return result;
    },
    async signup(reqSignupDto) {
      console.log(`++++++ [user.js] signup() ++++++`);
      console.log(`❯❯❯❯❯❯ [user.js] signup() reqSignupDto:`, reqSignupDto);
      let result = {}
      await axios.post(`/api/users/signup`, reqSignupDto)
        .then((res) => {
          console.log(`❯❯❯❯❯❯ [user.js] signup() res:`, res);
          result = res.data.result;
        }).catch((err) => {
          console.error(err);
        });
      return result;
    },
    async login(reqLoginDto) {
      console.log(`++++++ [user.js] login() ++++++`);
      console.log(`❯❯❯❯❯❯ [user.js] login() reqLoginDto:`, reqLoginDto);
      let result = {}
      const params = new URLSearchParams();
      const { username, password } = reqLoginDto
      params.append("username", username)
      params.append("password", password)
      // await axios.post(`/api/auth/login`, params)
      //   .then((res) => {
      //     console.log(`❯❯❯❯❯❯ res:`, res);
      //     console.log(`❯❯❯❯❯❯ res.data:`, res.data);
      //     console.log(`❯❯❯❯❯❯ res.cookie:`, res.cookie);
      //     result = res.data
      //   }).catch((err) => {
      //     console.error(`❯❯❯❯❯❯ err:`, err);
      //   });
      const axiosResult = await axios.post(`/api/auth/login`, params)
        .catch((err) => {
          console.error(`❯❯❯❯❯❯ [user.js] login() err:`, err);
        });
      console.log(`❯❯❯❯❯❯ [user.js] login() axiosResult:`, axiosResult);
      return axiosResult.data;
    },
    async testRefresh() {
      console.log(`++++++ [user.js] testRefresh() ++++++`);
      let result = {}
      const axiosResult = await axios.get(`/api/auth/refresh`)
        .catch((err) => {
          console.error(`❯❯❯❯❯❯ [user.js] testRefresh() err:`, err);
        });
      console.log(`❯❯❯❯❯❯ [user.js] testRefresh() axiosResult:`, axiosResult);
      return axiosResult
      
    }
    // async testJwtGuard() {
    //   console.log(`++++++ [user.js] testJwtGuard() ++++++`);
    //   let result = {}
    //   const axiosResult = await axios.get(`/api/auth/test-profile`)
    //     .catch((err) => {
    //       console.error(`❯❯❯❯❯❯ err:`, err);
    //     });
    //   console.log(`❯❯❯❯❯❯ axiosResult:`, axiosResult);
    //   return axiosResult
    // }
  //   async sendAndVerifyEmail(reqSendEmailDto) {
  //     console.log(`[user.js] sendAndVerifyEmail()`);
  //     console.log(`❯❯❯❯❯❯ reqSendEmailDto:`, reqSendEmailDto);
  //     const result = {}
  //     await axios.post(`/api/admissions/email-send`, reqSendEmailDto)
  //       .then((res) => {
  //         console.log(res);
  //         result = res.data;
  //       }).catch((err) => {
  //         console.error(err);
  //       });
  //   }
  }
})
