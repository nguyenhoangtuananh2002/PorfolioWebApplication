import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.sub.id,
      email: payload.email,
      avatar: payload.sub.avatar,
      firstname: payload.sub.firstname,
      lastname: payload.sub.lastname,
      skills: payload.sub.skills,
      role: payload.sub.role,
      is_admin: payload.sub.is_admin,
    };
  }
}
