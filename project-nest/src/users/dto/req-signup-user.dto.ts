export class ReqSignupUserDto {
  readonly user: {
    email: string;
    password: string;
    username: string;
  };
  readonly role: {
    position: 'brand' | 'customer';
  };
  readonly place?: {
    // brand는 필수o, customer는 필수x
    zipcode: string;
    basic: string;
    detail: string;
  };

  /* brand */
  readonly brand?: {
    readonly businessName: string;
    readonly brn: string;
    readonly introduction?: string;
  };

  /* customer */
  readonly customer?: {
    readonly nickname?: string;
  };
}
