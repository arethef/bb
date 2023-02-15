import { Base } from 'src/common/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('admissions')
export class Admission extends Base {
  @Column()
  email: string;
  @Column()
  signupVerifyToken: string;
  @Column({ default: 'undone' })
  status: string; // 'undone' | 'done'
}
