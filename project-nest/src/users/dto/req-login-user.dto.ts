export class ReqLoginUserDto {
  readonly user: {
    readonly username: string;
    readonly password: string;
  };
  // readonly role: {
  //   readonly position: 'brand' | 'customer';
  // };
}
