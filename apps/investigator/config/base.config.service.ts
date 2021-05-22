export type Optional<T> = T | undefined | null;

export class BaseConfigService {
  constructor(private readonly env: Record<string, string>) {}

  protected getValue(key: string, throwOnMissing = false): Optional<string> {
    const value = this.env[key];

    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value ?? null;
  }

  protected ensureValues(keys: string[]): BaseConfigService {
    keys.forEach((key) => this.getValue(key));

    return this;
  }

  isProduction(): boolean {
    return this.getValue('MODE') === 'production';
  }

  isDevelopment(): boolean {
    return this.getValue('MODE') === 'development';
  }

  isTest(): boolean {
    return this.getValue('MODE') === 'test';
  }
}
