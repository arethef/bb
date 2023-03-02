export class ReqUpdateBrandDto {
  user: {
    email: string;
    username: string;
    password: string;
    image: {
      id: string;
    };
    place: {
      zipcode: string;
      basic: string;
      detail: string;
    };
  };
  introduction: string;
}
