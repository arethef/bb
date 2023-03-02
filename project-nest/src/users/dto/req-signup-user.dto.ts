export class ReqSignupUserDto {
  readonly user: {
    readonly email: string;
    readonly password: string;
    readonly username: string;
  };
  readonly role: {
    readonly position: 'brand' | 'customer';
  };
  readonly image: {
    readonly id: string;
  };

  readonly place?: {
    // brand는 필수o, customer는 필수x
    readonly zipcode: string;
    readonly basic: string;
    readonly detail: string;
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
