import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [
    ChatModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'chai_dev',
      autoLoadEntities: true,
      synchronize: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
    }),
  ],
  controllers: [],
})
export class ApplicationModule {}
