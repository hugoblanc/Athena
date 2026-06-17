/** Bannière de migration vers la PWA, pilotée à distance par l'API. */
export interface MigrationBanner {
  enabled: boolean;
  title: string;
  message: string;
  ctaLabel: string;
  ctaUrl: string;
  learnMoreUrl: string;
}

export interface AppConfig {
  migrationBanner: MigrationBanner;
}
