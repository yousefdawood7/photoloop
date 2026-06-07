import { Controller, Post } from '@nestjs/common';
import { AllowAnonymous, AuthService } from '@thallesp/nestjs-better-auth';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @AllowAnonymous() // Allow anonymous access
  async sendEmail() {
    await this.authService.api.sendVerificationEmail({
      body: { email: 'yousefdawood31@gmail.com' },
    });

    return { message: 'Verification email sent' };
  }
}
