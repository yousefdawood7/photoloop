import { Global, Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import { env } from '../common/utils/env';
import { KEYS } from '../common/utils/key';
import { ConfigService } from './config.service';
@Global()
@Module({
  providers: [
    ConfigService,
    {
      provide: KEYS.DATABASE_CONNECTION,
      useFactory: () => {
        const pool = new Pool({
          connectionString: env.DATABASE_URL,
        });
        return drizzle({ client: pool });
      },
    },
  ],
  exports: [KEYS.DATABASE_CONNECTION, ConfigService],
})
export class ConfigModule {}
