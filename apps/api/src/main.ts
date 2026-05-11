import { NestFactory } from '@nestjs/core';

import './common/env'; // to validate env schema on build
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3001);
}

void bootstrap();
