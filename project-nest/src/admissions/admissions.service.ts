import * as uuid from 'uuid';
import * as nodemailer from 'nodemailer';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ReqSendEmailDto } from './dto/req-send-email.dto';
import { Admission } from './entities/admission.entity';
import emailConfig from 'src/config/emailConfig';
import { ConfigType } from '@nestjs/config';
import Mail from 'nodemailer/lib/mailer';
import { ReqVerifyEmailDto } from './dto/req-verify-email.dto';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class AdmissionsService {
  private transporter: Mail;
  constructor(
    private dataSource: DataSource,
    @Inject(emailConfig.KEY)
    private emailconfig: ConfigType<typeof emailConfig>,
  ) {
    this.transporter = nodemailer.createTransport({
      service: emailconfig.service,
      auth: {
        user: emailconfig.auth.user,
        pass: emailconfig.auth.pass,
      },
    });
  }

  async verifyEmail(dto: ReqVerifyEmailDto) {
    console.log(`[admissions.service.ts] verifyEmail()`);
    console.log(`❯❯❯❯❯❯ dto:`, dto);

    const { signupVerifyToken } = dto;
    const admission: Admission = await Admission.findOne({
      where: { signupVerifyToken },
    });
    if (!admission) {
      throw new NotFoundException(
        `[admissions.service.ts] verifyEmail() 이메일 인증 문제다.`,
      );
    }
    admission.status = 'done';
    const qr = this.dataSource.createQueryRunner();
    await qr.connect();
    await qr.startTransaction();
    try {
      await qr.manager.save(admission);
      await qr.commitTransaction();
    } catch (e) {
      await qr.rollbackTransaction();
    } finally {
      await qr.release();
    }
  }
  async sendUserJoinEmail(dto: ReqSendEmailDto) {
    console.log(`[admissions.service.ts] sendUserJoinEmail()`);
    console.log(`❯❯❯❯❯❯ dto:`, dto);
    const { email } = dto;
    const signupVerifyToken = uuid.v4();

    const admission: Admission = new Admission();
    admission.email = email;
    admission.signupVerifyToken = signupVerifyToken;
    const qr = this.dataSource.createQueryRunner();
    await qr.connect();
    await qr.startTransaction();
    try {
      await qr.manager.save(admission);
      await qr.commitTransaction();
    } catch (e) {
      await qr.rollbackTransaction();
    } finally {
      await qr.release();
    }

    const baseUrl = this.emailconfig.baseUrl;
    const url = `${baseUrl}/admissions/email-verify?signupVerifyToken=${signupVerifyToken}`;
    const mailOptions: EmailOptions = {
      to: email,
      subject: `[BB] 회원 가입 이메일 인증`,
      html: `
      인증 확인 버튼을 누르시면 이메일 인증이 완료됩니다. <br/>
      <form action="${url}" method="POST">
        <button>인증 확인</button>
      </form>ds
      `,
    };
    return await this.transporter.sendMail(mailOptions);
  }
}
