import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as path from 'path';

export default (): PostgresConnectionOptions => ({
    url: process.env.url,
    type: 'postgres',
    port: Number(process.env.portNumber),
    entities: [path.resolve(__dirname, '..') + '/**/*.entity{.ts,.js}'],// добавлены все сущности из данной папки чтобы не заводить руками

    synchronize: true,
    ssl: {
        rejectUnauthorized: false,
    },
})