
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User, UsersService } from '../../users/users.service';

export interface AccessTokenPayload {
  sub: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private users: UsersService;

  /**
   *
   * @param users
   */
  public constructor(users: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret',
      signOptions: {
        expiresIn: '5m',
      },
    });

    this.users = users;
  }

  /**
   *
   * @param payload
   */
  async validate(payload: AccessTokenPayload): Promise<User> {
    const { sub: id } = payload;

    const user = await this.users.findForId(id);

    if (!user) {
      return null;
    }

    return user;
  }
}