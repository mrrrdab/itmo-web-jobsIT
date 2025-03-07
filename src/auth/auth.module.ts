import { MiddlewareConsumer, NestModule, Module, DynamicModule } from '@nestjs/common';

import { SupertokensService } from './supertokens';
import { AuthMiddleware } from './auth.middleware';
import { ConfigInjectionToken, AuthModuleConfig } from './auth.config';

@Module({})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }

  static forRoot({ connectionURI, apiKey, appInfo }: AuthModuleConfig): DynamicModule {
    return {
      providers: [
        {
          useValue: {
            appInfo,
            connectionURI,
            apiKey,
          },
          provide: ConfigInjectionToken,
        },
        SupertokensService,
      ],
      module: AuthModule,
    };
  }
}
