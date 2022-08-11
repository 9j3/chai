import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from "./auth/auth.module";

@Module({
    imports: [
        AuthModule,
    ],
})

export class AppModule {}