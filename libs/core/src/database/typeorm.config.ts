import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AppConfig } from '../config/env.schema';

config();

export const buildDataSourceOptions = (
  config: AppConfig,
): DataSourceOptions => ({
  type: 'postgres',
  url: config.DATABASE_URL,
  entities: [__dirname + '/../../../shared/src/entities/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*.{ts,.js}'],
  synchronize: false,
  logging: config.NODE_ENV === 'development',
  ssl: config.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  extra: {
    max: 20,
    idleTimeoutMillis: 30000,
  },
});

export const AppDataSource = new DataSource(
  buildDataSourceOptions({
    DATABASE_URL: process.env.DATABASE_URL || '',
    NODE_ENV: (process.env.NODE_ENV as AppConfig['NODE_ENV']) ?? 'development',
  } as AppConfig),
);
