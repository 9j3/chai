import { NestFactory } from '@nestjs/core'
import { ApplicationModule } from './app.module'
import { SocketIoAdapter } from './adapters/socketio.adapter'

declare const module: any

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule)

  app.enableCors()

  const port = parseInt(process.env.PORT) || 3000
  const host = process.env.HOST || '127.0.0.1'

  app.useWebSocketAdapter(new SocketIoAdapter(app))

  await app.listen(port, host)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}

bootstrap()
