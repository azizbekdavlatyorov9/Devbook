import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";
class RegisterDto {
  @IsString() @MinLength(3) username!: string;
  @IsString() @MinLength(2) lastName!: string;
  @IsString() @IsNotEmpty() phone!: string;
  @IsEmail() email!: string;
  @IsString() @MinLength(6) password!: string;
}
class LoginDto {
  @IsEmail() email!: string;
  @IsString() password!: string;
}
class VerifyDto {
  @IsEmail() email!: string;
  @IsString() code!: string;
}
class PasswordDto {
  @IsString() @MinLength(6) new_password!: string;
}
@Controller()
export class AuthController {
  constructor(private auth: AuthService) {}
  private cookies(res: Response, access: string, refresh: string) {
    res.cookie("accessToken", access, { httpOnly: true, maxAge: 900000 });
    res.cookie("refreshToken", refresh, { httpOnly: true, maxAge: 604800000 });
  }
  @Post("register") register(@Body() body: RegisterDto) {
    return this.auth.register(body);
  }
  @Post("login") login(@Body() body: LoginDto) {
    return this.auth.beginLogin(body.email, body.password);
  }
  @Post("verify") async verify(
    @Body() body: VerifyDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.auth.verify(body.email, body.code);
    this.cookies(res, result.access, result.refresh);
    return { message: result.message, token: result.token };
  }
  @Get("refresh") async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.auth.refresh(req.cookies?.refreshToken);
    this.cookies(res, result.access, result.refresh);
    return { message: "Success" };
  }
  @Get("logout") logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return { message: "ok" };
  }
  @Post("forgot-password") forgot(@Body() body: Pick<LoginDto, "email">) {
    return this.auth.forgot(body.email);
  }
  @UseGuards(JwtAuthGuard) @Post("change-password") change(
    @Req() req: any,
    @Body() body: PasswordDto,
  ) {
    return this.auth.changePassword(req.user.email, body.new_password);
  }
  @UseGuards(JwtAuthGuard) @Get("profile") profile(@Req() req: any) {
    return this.auth.profile(req.user.id);
  }
}
