import { dymoEmailPlugin } from '@dymo-api/better-auth';
import { Module } from '@nestjs/common';
import { render } from '@react-email/render';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import {
  lastLoginMethod,
  magicLink,
  oneTap,
  openAPI,
  twoFactor,
} from 'better-auth/plugins';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { ResendModule, ResendService } from 'nestjs-resend';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { schema } from './common/db/schemas';
import { EmailTemplate } from './common/emails/email-template';
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
          trustedOrigins: [configService.env().FRONTEND_URL],
          plugins: [
            oneTap(),
            twoFactor(),
            openAPI(),
            lastLoginMethod(),

            dymoEmailPlugin({
              apiKey: configService.env().DYMO_KEY,
              normalize: false,

              emailRules: {
                deny: ['FRAUD', 'INVALID', 'NO_REPLY_EMAIL'],
              },
            }),

            magicLink({
              sendMagicLink: async ({ email, url, metadata }) => {
                void resendService.send({
                  from: 'Photoloop <hello@yousefdawood.me>',
                  to: email,
                  subject: 'Your magic link for Photoloop',

                  html: await render(
                    EmailTemplate({
                      name: (metadata?.name || '') as string,
                      magicLink: url,
                      variant: 'magic-link',
                    }),
                  ),
                });
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
                  EmailTemplate({
                    name: user.name,
                    otp: '123456',
                    variant: 'otp',
                  }),
                ),
              });
            },
            sendOnSignUp: true,
            sendOnSignIn: true,
            autoSignInAfterVerification: true,
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
