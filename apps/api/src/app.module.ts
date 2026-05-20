import { Module } from '@nestjs/common';
import { render } from '@react-email/render';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { ResendModule, ResendService } from 'nestjs-resend';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { schema } from './common/db/schemas';
import { VerifyEmailTemplate } from './common/emails/verify-email';
import { KEYS } from './common/utils/key';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    ConfigModule,
    AuthModule.forRootAsync({
      useFactory: (drizzle: NodePgDatabase, resendService: ResendService) => ({
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
          emailVerification: {
            sendVerificationEmail: async ({ user }) => {
              void resendService.send({
                from: 'Photoloop <hello@yousefdawood.me>',
                to: user.email,
                subject: 'Verify your email for Photoloop',

                html: await render(
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                  VerifyEmailTemplate({ name: 'Yousef Dawood', otp: '123456' }),
                ),

                // attachments: [
                //   {
                //     path: 'https://i.ibb.co/67wqpNFY/logomark-1.png',
                //     filename: 'logo.png',
                //     inlineContentId: 'logo-image',
                //   },
                // ],
              });
            },
            sendOnSignUp: true,
            sendOnSignIn: true,
            autoSignInAfterVerification: true,
          },
        }),
      }),
      inject: [KEYS.DATABASE_CONNECTION, ResendService],
    }),

    ResendModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.env().RESEND_API_KEY,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
