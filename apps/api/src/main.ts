import { NestFactory } from '@nestjs/core';

import 'dotenv/config';
import { AppModule } from './app.module';
import { env } from './common/utils/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(env.PORT ?? 3001);
}

void bootstrap();
