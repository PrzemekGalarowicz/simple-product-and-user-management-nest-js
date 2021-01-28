const config = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'kodilla_shop',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  dropSchema: false,
  migrationsRun: false,
  migrations: [__dirname + '/db/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
  subscribers: [__dirname + '/db/subscribers/**/*{.ts,.js}'],
};

export default config
