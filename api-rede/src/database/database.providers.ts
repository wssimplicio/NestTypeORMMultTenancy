import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
        username: process.env.DB_USER_NAME || 'postgres',
        password: process.env.DB_USER_PASSWORD || 'postgres',
        database: process.env.DB_DATABASE || 'rede',
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
