import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthenticationController } from './auth.controller';
import { TokensService } from './token.service';
import { RefreshTokensRepository } from './refresh-token.repository';
import { JwtStrategy } from './strategies/jwt.strategy';


@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: '5m',
      },
    }),
    UsersModule,
  ],
  controllers: [
    AuthenticationController,
  ],
  providers: [
    JwtStrategy,
    TokensService,
    RefreshTokensRepository,
  ],
})
export class AuthenticationModule {}