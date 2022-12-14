import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);

  app.enableCors();

  const port = parseInt(process.env.PORT as string) || 3000;
  const host = process.env.HOST || '127.0.0.1';

  app.useWebSocketAdapter(new IoAdapter(app));

  await app.listen(port, host);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
