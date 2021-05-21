import { BaseConfigService } from './base.config.service';

export class ConfigService extends BaseConfigService {
  constructor(env: Record<string, string> = process.env) {
    super(env);
  }

  getApiEndpoint(): string {
    return this.getValue('API_ENDPOINT') ?? 'http://localhost:3000';
  }
}
