import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthenticationController } from './auth.controller';
import { TokensService } from './token.service';
import { RefreshTokensRepository } from './refresh-token.repository';


@Module({
  imports: [
    JwtModule.register({
      secret: 'supersecret',
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
    TokensService,
    RefreshTokensRepository,
  ],
})
export class AuthenticationModule {}