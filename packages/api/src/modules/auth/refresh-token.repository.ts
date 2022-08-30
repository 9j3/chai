import { Injectable } from '@nestjs/common';
import { RefreshToken } from './token.service';
import { User } from '../users/users.service';
import { randomUUID } from 'crypto';

@Injectable()
export class RefreshTokensRepository {
  public readonly refreshTokens: RefreshToken[] = [];

  /**
   * Creates a refresh token and stores it in memory
   * @param user
   * @param ttl
   */
  public createRefreshToken(user: User, ttl: number) {
    // set the expiration date of the refresh token
    const expiration = new Date();
    expiration.setTime(expiration.getTime() + ttl);

    // create a new "mock" token
    const token = {
      id: randomUUID(),
      user_id: user.userId,
      is_revoked: false,
      expires: expiration,
    };

    // store token in memory
    this.refreshTokens.push(token);

    return token;
  }

  /**
   *
   * @param id
   */
  public findTokenById(id: string): RefreshToken | null {
    return this.refreshTokens.find((rtkn) => rtkn.id === id);
  }
}
