import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: +configService.get<number>('DB_PORT', 5432),
        username: configService.get('DB_USER_NAME', 'postgres'),
        password: configService.get('DB_USER_PASSWORD', 'postgres'),
        database: configService.get('DB_DATABASE', 'rede'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migration/**/*{.ts,.js}'],
        synchronize: false,
        logging: true,
        migrationsRun: true,
      });

      return dataSource.initialize();
    },
  },
];
