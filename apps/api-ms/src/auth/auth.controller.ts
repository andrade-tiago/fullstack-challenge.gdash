import { Body, Controller, Post } from "@nestjs/common";
import { UserLoginDto } from "./dtos/user-login.dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _authService: AuthService,
  ) {}

  @Post('login')
  login(@Body() credentials: UserLoginDto) {
    return this._authService.login({ ...credentials })
  }
}
