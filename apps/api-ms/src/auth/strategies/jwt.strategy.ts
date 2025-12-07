import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayloadDto } from '../dtos/jwt-payload.dto';
import { AuthDataDto } from '../dtos/auth-data.dto';
import { ConfigService } from '@nestjs/config';
import { Env } from 'src/config/env';
import { Inject } from '@nestjs/common';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(ConfigService)
    configService: ConfigService<Env, true>
  ) {
    const jwtConfig = configService.getOrThrow<Env['jwt']>('jwt')

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret,
    })
  }

  validate(payload: JwtPayloadDto): AuthDataDto {
    return {
      userId: payload.sub,
      userEmail: payload.email,
      userRole: payload.role,
    }
  }
}
