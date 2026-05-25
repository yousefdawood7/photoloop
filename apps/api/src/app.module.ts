import { Module } from '@nestjs/common';
import { render } from '@react-email/render';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { magicLink, oneTap, openAPI, twoFactor } from 'better-auth/plugins';
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
      useFactory: (
        drizzle: NodePgDatabase,
        resendService: ResendService,
        configService: ConfigService,
      ) => ({
        auth: betterAuth({
          appName: 'Photoloop',
          baseURL: configService.env().BETTER_AUTH_URL,
          plugins: [
            oneTap(),
            twoFactor(),
            openAPI({
              path: '/docs/auth',
            }),
            magicLink({
              sendMagicLink: async ({ email, token, url, metadata }, ctx) => {
                // send email to user
              },
            }),
          ],
          database: drizzleAdapter(drizzle, {
            provider: 'pg',
            usePlural: true,
            schema,
          }),
          socialProviders: {
            google: {
              clientId: configService.env().GOOGLE_CLIENT_ID,
              clientSecret: configService.env().GOOGLE_CLIENT_SECRET,
            },
            github: {
              clientId: configService.env().GITHUB_CLIENT_ID,
              clientSecret: configService.env().GITHUB_CLIENT_SECRET,
            },
            facebook: {
              clientId: configService.env().FACEBOOK_CLIENT_ID,
              clientSecret: configService.env().FACEBOOK_CLIENT_SECRET,
            },
          },
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
                  VerifyEmailTemplate({ name: 'Yousef Dawood', otp: '123456' }),
                ),
              });
            },
            sendOnSignUp: true,
            sendOnSignIn: true,
            autoSignInAfterVerification: true,
            trustedOrigins: ['http://localhost:3000'],
          },
        }),
      }),
      inject: [KEYS.DATABASE_CONNECTION, ResendService, ConfigService],
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
