export class ReqUpdateCustomerDto {
  user: {
    email: string;
    username: string;
    password: string;
    image: {
      id: string;
    };
    place?: {
      zipcode: string;
      basic: string;
      detail: string;
    };
  };
  nickname: string;
}
