import { Injectable } from '@nestjs/common';

import { env } from '../common/env';

@Injectable()
export class EnvService {
  env(): typeof env {
    return env;
  }
}
