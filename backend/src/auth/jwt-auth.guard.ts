import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const token =
      req.cookies?.accessToken ||
      req.headers.authorization?.replace("Bearer ", "");
    if (!token) throw new UnauthorizedException("No token provided");
    try {
      req.user = await this.jwt.verifyAsync(token, {
        secret: this.config.getOrThrow("SECRET_KEY"),
      });
      return true;
    } catch {
      throw new UnauthorizedException("Invalid token");
    }
  }
}
