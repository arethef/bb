import axios from 'axios'
import { defineStore } from 'pinia'
import { OPEN_API_BUSINESS_URL, OPEN_API_BUSINESS_ENCODING, OPEN_API_BUSINESS_DECODING } from '../config';

export const useUserStore = defineStore('brand', {
  state: () => ({
  }),
  gettesr: {

  },
  actions: {
    async checkEmailExists(reqCheckEmailDto) {
      console.log(`[user.js] checkEmailExists()`);
      console.log(`❯❯❯❯❯❯ reqCheckEmailDto:`, reqCheckEmailDto);
      let result = {}
      await axios.post(`/api/users/email-check`, reqCheckEmailDto)
        .then((res) => {
          console.log(`❯❯❯❯❯❯ res.data:`, res.data);
          result = res.data;
        }).catch((err) => {
          console.error(err);
        });
      return result;
    },
    async checkBrnValidates(data) {
      console.log(`[user.js] checkBrnValidates()`);
      console.log(`❯❯❯❯❯❯ data:`, data);
      let result = {}
      await axios({
        method: 'post',
        url: `${OPEN_API_BUSINESS_URL}${OPEN_API_BUSINESS_ENCODING}`,
        headers: {
          "Authorization": `${OPEN_API_BUSINESS_DECODING}`,
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        data
      }).then((res) => {
        console.log(`❯❯❯❯❯❯ res.data:`, res.data);
        console.log(`❯❯❯❯❯❯ res.data.data:`, res.data.data);
        console.log(`❯❯❯❯❯❯ res.data.data[0]:`, res.data.data[0]);
        result = res.data.data[0];
      }).catch((err) => {
        console.error(`❯❯❯❯❯❯ err:`, err);
      });
      return result;
    },
    async signup(reqBrandSignupDto) {
      console.log(`[user.js] signup()`);
      console.log(`❯❯❯❯❯❯ reqBrandSignupDto:`, reqBrandSignupDto);
      let result = {}
      await axios.post(`/api/users/signup`, reqBrandSignupDto)
        .then((res) => {
          console.log(`❯❯❯❯❯❯ res:`, res);
          result = res.data.result;
        }).catch((err) => {
          console.error(err);
        });
      return result;
    }
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

// {  "businesses":
//     [
//         {
//         "b_no": "0000000000",
//         "start_dt": "20000101",
//         "p_nm": "홍길동",
//         "p_nm2": "홍길동",
//         "b_nm": "(주)테스트",
//         "corp_no": "0000000000000",
//         "b_sector": "",
//         "b_type": ""
//         }
//     ]
// }