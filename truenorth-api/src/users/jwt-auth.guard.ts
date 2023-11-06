import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UsersService } from "./users.service";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private usersService: UsersService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const authorization: string = request.headers["authorization"];
      if (authorization) {
        const token = authorization.split(" ")[1];
        const { username } = await this.usersService.verifyToken(token);
        return username ? true : false;
      }
    } catch (error) {
      console.log(error);
    }
    return false;
  }
}
