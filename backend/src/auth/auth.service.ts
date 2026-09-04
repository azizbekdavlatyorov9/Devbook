import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcryptjs";
import * as nodemailer from "nodemailer";

import { User } from "./entities/user.entity";

export type JwtUser = {
  id: string;
  email: string;
  role: string;
};

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,

    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  private async sendEmail(to: string, code: string) {
    const pass = this.config.get<string>("EMAIL_PASS");

    if (!pass) return;

    const from =
      this.config.get<string>("EMAIL_USER") ??
      "azizbekdavlatyorov9@gmail.com";

    await nodemailer
      .createTransport({
        service: "gmail",
        auth: {
          user: from,
          pass,
        },
      })
      .sendMail({
        from,
        to,
        subject: "DevBook",
        html: `<h1>${code}</h1>`,
      });
  }

  private code() {
    return Array.from(
      { length: 6 },
      () => Math.floor(Math.random() * 10),
    ).join("");
  }

  tokens(user: JwtUser) {
    return {
      access: this.jwt.sign(user, {
        secret: this.config.getOrThrow("SECRET_KEY"),
        expiresIn: "15m",
      }),

      refresh: this.jwt.sign(user, {
        secret: this.config.getOrThrow("REFRESH_SECRET_KEY"),
        expiresIn: "7d",
      }),
    };
  }

  async register(data: any) {
    const existingUser = await this.users.findOne({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      throw new BadRequestException("User already exists");
    }

    const code = this.code();

    await this.sendEmail(data.email, code);

    const user = this.users.create({
      ...data,
      password: await bcrypt.hash(data.password, 12),
      otp: code,
      otpTime: Date.now() + 120000,
    });

    await this.users.save(user);

    return {
      message: "Registered",
      email: data.email,
    };
  }

  async beginLogin(email: string, password: string) {
    const user = await this.users.findOne({
      where: {
        email,
      },
    });

    if (
      !user ||
      !(await bcrypt.compare(password, user.password))
    ) {
      throw new UnauthorizedException(
        "Wrong email or password",
      );
    }

    const code = this.code();

    await this.sendEmail(email, code);

    user.otp = code;
    user.otpTime = Date.now() + 120000;

    await this.users.save(user);

    return {
      message: "Please check your email for the code",
    };
  }

  async verify(email: string, code: string) {
    const user = await this.users.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    if (!user.otpTime || user.otpTime < Date.now()) {
      throw new UnauthorizedException("Code expired");
    }

    if (user.otp !== code) {
      throw new UnauthorizedException("Wrong code");
    }

    user.otp = "";
    user.otpTime = 0;

    await this.users.save(user);

    const tokens = this.tokens({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      message: "Success",
      token: tokens.access,
      ...tokens,
    };
  }

  async refresh(token: string) {
    try {
      const user =
        await this.jwt.verifyAsync<JwtUser>(token, {
          secret: this.config.getOrThrow(
            "REFRESH_SECRET_KEY",
          ),
        });

      return this.tokens(user);
    } catch {
      throw new UnauthorizedException(
        "Invalid refresh token",
      );
    }
  }

  async profile(id: string) {
    const user = await this.users.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    const { password, otp, otpTime, ...result } = user;

    return result;
  }

  async forgot(email: string) {
    const user = await this.users.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    const code = this.code();

    await this.sendEmail(email, code);

    user.otp = code;
    user.otpTime = Date.now() + 120000;

    await this.users.save(user);

    return {
      message: "Please check your email for the code",
    };
  }

  async changePassword(
    email: string,
    password: string,
  ) {
    const user = await this.users.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    user.password = await bcrypt.hash(password, 12);

    await this.users.save(user);

    return {
      message: "Success",
    };
  }
}