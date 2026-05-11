import { Global, Module } from '@nestjs/common';

import { ConfigService } from './config.service';

@Module({
  providers: [ConfigService],
})
@Global()
export class ConfigModule {}
