import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { AppConfig } from '../config/env.schema';

@Global()
@Module({
  imports: [
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<AppConfig, true>) => {
        const lokiUrl = config.get('GRAFANA_LOKI_URL');
        const level = config.get('LOG_LEVEL');
        const serviceName = config.get('SERVICE_NAME');
        const isDev = config.get('NODE_ENV') === 'development';

        type PinoTarget = {
          target: string;
          options: Record<string, unknown>;
          level: string;
        };

        const targets: PinoTarget[] = [
          {
            target: 'pino-loki',
            options: {
              host: lokiUrl,
              labels: { app: serviceName },
              batching: true,
              interval: 5,
              silenceErrors: false,
            },
            level,
          },
        ];

        if (isDev) {
          targets.push({
            target: 'pino-pretty',
            options: {
              colorize: true,
              singleLine: false,
              translateTime: 'SYS:HH:MM:ss',
              ignore: 'pid,hostname',
            },
            level: 'debug',
          });
        }

        return {
          pinoHttp: {
            level,
            transport: { targets },
            serializers: {
              req: (req: { method: string; url: string }) => ({
                method: req.method,
                url: req.url,
              }),
              res: (res: { statusCode: number }) => ({
                statusCode: res.statusCode,
              }),
            },
            autoLogging: {
              ignore: (req: { url?: string }) =>
                req.url === '/metrics' || req.url === '/health',
            },
          },
        };
      },
    }),
    PrometheusModule.register({
      path: '/metrics',
      defaultMetrics: { enabled: true },
    }),
  ],
})
export class ObservabilityModule {}
