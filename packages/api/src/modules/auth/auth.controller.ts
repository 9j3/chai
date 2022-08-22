import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { RegisterRequest, LoginRequest, RefreshRequest } from '../../requests';
import { User, UsersService } from '../users/users.service';
import { TokensService } from './token.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

export interface AuthenticationPayload {
  user: User
  payload: {
    type: string
    token: string
    refresh_token?: string
  }
}

@Controller('/api/auth')
export class AuthenticationController {
  private readonly users: UsersService;

  private readonly tokens: TokensService;

  /**
   *
   * @param users
   * @param tokens
   */
  public constructor(users: UsersService, tokens: TokensService) {
    this.users = users;
    this.tokens = tokens;
  }

  /**
   *
   * @param body
   */
  @Post('/register')
  public async register(@Body() body: RegisterRequest) {
    const user = await this.users.createUserFromRequest(body);

    const token = await this.tokens.generateAccessToken(user);
    const refresh = await this.tokens.generateRefreshToken(user, 60 * 60 * 24 * 30);  // 30 days

    const payload = this.buildResponsePayload(user, token, refresh);

    return {
      status: 'success',
      data: payload,
    };
  }

  /**
   *
   * @param body
   */
  @Post('/login')
  public async login(@Body() body: LoginRequest) {
    const { username, password } = body;

    const user = await this.users.findForUsername(username);

    console.log(body);

    const valid = user ? this.users.validateCredentials(user, password) : false;

    if (!valid) {
      throw new UnauthorizedException('The login is invalid');
    }

    const token = await this.tokens.generateAccessToken(user);
    const refresh = await this.tokens.generateRefreshToken(user, 60 * 60 * 24 * 30);  // 30 days

    const payload = this.buildResponsePayload(user, token, refresh);

    return {
      status: 'success',
      data: payload,
    };
  }

  /**
   *
   * @param body
   */
  @Post('/refresh')
  public async refresh(@Body() body: RefreshRequest) {
    const { user, token } = await this.tokens.createAccessTokenFromRefreshToken(body.refresh_token);

    const payload = this.buildResponsePayload(user, token);

    return {
      status: 'success',
      data: payload,
    };
  }

  /**
   *
   * @param request
   */
  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  public async getUser(@Req() request) {
    const userId = request.user.id;

    const user = await this.users.findForId(userId);

    return {
      status: 'success',
      data: user,
    };
  }

  /**
   *
   * @param user
   * @param accessToken
   * @param refreshToken
   * @private
   */
  private buildResponsePayload(user: User, accessToken: string, refreshToken?: string): AuthenticationPayload {
    return {
      user: user,
      payload: {
        type: 'bearer',
        token: accessToken,
        ...(refreshToken ? { refresh_token: refreshToken } : {}),
      },
    };
  }
}