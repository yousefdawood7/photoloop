import { Injectable } from '@nestjs/common';

import { env } from '../common/utils/env';

@Injectable()
export class ConfigService {
  env(): typeof env {
    return env;
  }
}
