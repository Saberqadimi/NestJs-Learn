import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import * as path from 'path';
import { registerAs } from "@nestjs/config";

export default registerAs(
    'dbconfig.dev',
    (): PostgresConnectionOptions => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [path.resolve(__dirname, '..') + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: true,

    }),
);