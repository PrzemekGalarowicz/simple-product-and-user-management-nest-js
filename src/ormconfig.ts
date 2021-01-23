export const config = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'kodilla_shop',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true
}