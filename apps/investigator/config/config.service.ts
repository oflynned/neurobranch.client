import { BaseConfigService } from './base.config.service';

export class ConfigService extends BaseConfigService {
  constructor(env: Record<string, string> = process.env) {
    super(env);
  }

  getApiEndpoint(): string {
    if (process.env.NEXT_PUBLIC_MODE === 'production') {
      return 'https://api.neurobranch.syzible.com';
    }

    return 'http://localhost:3000';
  }
}
