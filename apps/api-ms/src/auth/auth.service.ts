import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User, UserDocument } from "src/users/user.model";
import { JwtPayloadDto } from "./dtos/jwt-payload.dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Env } from "src/config/env";
import { UserLoginDto } from "./dtos/user-login.dto";
import { PasswordService } from "src/common/password.service";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class AuthService {
  private readonly _jwtConfig: Env['jwt'];

  constructor(
    @InjectModel(User.name)
    private readonly _userModel: Model<UserDocument>,

    private readonly _jwtService: JwtService,
    private readonly _passwordService: PasswordService,
    _configService: ConfigService<Env, true>,
  ) {
    this._jwtConfig = _configService.getOrThrow('jwt');
  }

  async login({ email, password }: UserLoginDto) {
    const user = await this._userModel.findOne({ email }).exec()

    if (!user)
      throw new UnauthorizedException('Incorrect e-mail or password.')

    const isMatch = await this._passwordService.compare(password, user.pass)

    if (!isMatch)
      throw new UnauthorizedException('Incorrect e-mail or password.')

    return await this._generateToken(user);
  }

  private async _generateToken(user: UserDocument) {
    const payload = {
      sub: user._id.toString(),
      email: user.email,
    } satisfies JwtPayloadDto

    const accessToken = await this._jwtService.signAsync(payload)

    return { accessToken }
  }
}
