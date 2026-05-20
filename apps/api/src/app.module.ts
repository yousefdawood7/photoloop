import { Module } from '@nestjs/common';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { schema } from './common/db/schemas';
import { KEYS } from './common/utils/key';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    ConfigModule,
    AuthModule.forRootAsync({
      useFactory: (drizzle: NodePgDatabase) => ({
        auth: betterAuth({
          database: drizzleAdapter(drizzle, {
            provider: 'pg',
            usePlural: true,
            schema,
          }),

          emailAndPassword: {
            enabled: true,
            requireEmailVerification: true,
            minPasswordLength: 8,
            maxPasswordLength: 128,
          },
        }),
      }),
      inject: [KEYS.DATABASE_CONNECTION],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
