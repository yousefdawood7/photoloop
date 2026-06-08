import { dymoEmailPlugin } from '@dymo-api/better-auth';
import { Module } from '@nestjs/common';
import { render } from '@react-email/render';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { APIError, betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { createAuthMiddleware } from 'better-auth/api';
import {
  emailOTP,
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
import { ResetPassswordEmail } from './common/emails/reset-password';
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

            emailOTP({
              sendVerificationOnSignUp: true,
              allowedAttempts: 5,
              expiresIn: 300,

              sendVerificationOTP: async ({ email, otp, type }) => {
                if (type === 'email-verification')
                  void resendService.send({
                    from: 'Photoloop <hello@yousefdawood.me>',
                    to: email,
                    subject: 'Verify your email for Photoloop',

                    html: await render(
                      EmailTemplate({
                        otp,
                        variant: 'otp',
                        expiredTime: 5,
                      }),
                    ),
                  });
              },
            }),

            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            dymoEmailPlugin({
              apiKey: configService.env().DYMO_KEY,
              normalize: false,

              emailRules: {
                deny: ['FRAUD', 'INVALID', 'NO_REPLY_EMAIL'],
              },
            }),
            magicLink({
              expiresIn: 300,

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
                      expiredTime: 5,
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
            resetPasswordTokenExpiresIn: 300,
            revokeSessionsOnPasswordReset: true,

            sendResetPassword: async ({ user, url }) => {
              void resendService.send({
                from: 'Photoloop <hello@yousefdawood.me>',
                to: user.email,
                subject: 'Reset Your Photoloop Password',

                html: await render(
                  ResetPassswordEmail({
                    name: user.name,
                    resetUrl: url,
                    expiredTime: 5,
                  }),
                ),
              });
            },

            /* 
             TODO we're going to implement it later
              onExistingUserSignUp: async ({ user }) => {
              void resendService.send({
                from: 'Photoloop <hello@yousefdawood.me>',
                to: user.email,
                subject: 'You have already signed up for Photoloop',

                html: await render(
                  AlreadySignedUpEmailTemplate({
                    name: user.name,
                  }),
                ),
              });
              },
            */
          },

          hooks: {
            before: createAuthMiddleware(async (ctx) => {
              // Intercept the password reset request
              if (ctx.path !== '/request-password-reset') return;

              const user = await ctx.context.internalAdapter.findUserByEmail(
                ctx.body.email,
              );

              if (!user) {
                throw new APIError('BAD_REQUEST', {
                  message: 'User not found',
                  code: 'USER_NOT_EXIST',
                });
              }
            }),
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
