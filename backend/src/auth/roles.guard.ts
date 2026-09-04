import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(c: ExecutionContext) {
    if (c.switchToHttp().getRequest().user?.role === "admin") return true;
    throw new ForbiddenException("You are not admin");
  }
}
