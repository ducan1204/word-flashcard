import { config } from "dotenv";
import { DataSource, DataSourceOptions } from 'typeorm';
config();

const {
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DATABASE,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
} = process.env;

module.exports.dataSource = new DataSource({
    type: 'postgres',
    host: POSTGRES_HOST,
    port: Number(POSTGRES_PORT),
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DATABASE,
    migrations: ['dist/migrations/*.js'],
    ssl: { rejectUnauthorized: false }
} as DataSourceOptions);
