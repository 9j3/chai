import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignOptions, TokenExpiredError } from 'jsonwebtoken';
import { RefreshTokensRepository } from './refresh-token.repository';
import { UsersRepository } from '../users/user.repository';
import { User } from '../users/users.service';

const BASE_OPTIONS: SignOptions = {
  issuer: 'https://example.tekoproject.local',
  audience: 'chai-vue-frontend',
};

export interface RefreshToken {
  id: string;
  user_id: string;
  is_revoked: boolean;
  expires: Date;
}

export interface RefreshTokenPayload {
  jti: number;
  sub: number;
}

@Injectable()
export class TokensService {
  private readonly tokens: RefreshTokensRepository;

  private readonly users: UsersRepository;

  private readonly jwt: JwtService;

  /**
   *
   * @param tokens
   * @param users
   * @param jwt
   */
  public constructor(
    tokens: RefreshTokensRepository,
    users: UsersRepository,
    jwt: JwtService,
  ) {
    this.tokens = tokens;
    this.users = users;
    this.jwt = jwt;
  }

  /**
   *
   * @param user
   */
  public async generateAccessToken(user: User): Promise<string> {
    const opts: SignOptions = {
      ...BASE_OPTIONS,
      subject: String(user.userId),
    };

    return this.jwt.sign({}, opts);
  }

  /**
   *
   * @param user
   * @param expiresIn
   */
  public generateRefreshToken(user: User, expiresIn: number): Promise<string> {
    const token = this.tokens.createRefreshToken(user, expiresIn);

    const opts: SignOptions = {
      ...BASE_OPTIONS,
      expiresIn,
      subject: String(user.userId),
      jwtid: String(token.id),
    };

    return this.jwt.signAsync({}, opts);
  }

  /**
   *
   * @param encoded
   */
  public async resolveRefreshToken(
    encoded: string,
  ): Promise<{ user: User; token: RefreshToken }> {
    const payload = await this.decodeRefreshToken(encoded);
    const token = await this.getStoredTokenFromRefreshTokenPayload(payload);

    if (!token) {
      throw new UnprocessableEntityException('Refresh token not found');
    }

    if (token.is_revoked) {
      throw new UnprocessableEntityException('Refresh token revoked');
    }

    const user = await this.getUserFromRefreshTokenPayload(payload);

    if (!user) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }

    return { user, token };
  }

  /**
   *
   * @param refresh
   */
  public async createAccessTokenFromRefreshToken(
    refresh: string,
  ): Promise<{ token: string; user: User }> {
    const { user } = await this.resolveRefreshToken(refresh);

    const token = await this.generateAccessToken(user);

    return { user, token };
  }

  /**
   *
   * @param token
   * @private
   */
  private async decodeRefreshToken(
    token: string,
  ): Promise<RefreshTokenPayload> {
    try {
      return await this.jwt.verifyAsync(token);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UnprocessableEntityException('Refresh token expired');
      } else {
        throw new UnprocessableEntityException('Refresh token malformed');
      }
    }
  }

  /**
   *
   * @param payload
   * @private
   */
  private async getUserFromRefreshTokenPayload(
    payload: RefreshTokenPayload,
  ): Promise<User> {
    const subId = payload.sub;

    if (!subId) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }

    return this.users.find('userId', subId);
  }

  /**
   *
   * @param payload
   * @private
   */
  private async getStoredTokenFromRefreshTokenPayload(
    payload: RefreshTokenPayload,
  ): Promise<RefreshToken | null> {
    const tokenId = String(payload.jti);

    if (!tokenId) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }

    return this.tokens.findTokenById(tokenId);
  }
}
