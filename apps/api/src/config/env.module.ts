import { Global, Module } from '@nestjs/common';

import { EnvService } from './env.service';

@Module({
  providers: [EnvService],
})
@Global()
export class EnvModule {}
