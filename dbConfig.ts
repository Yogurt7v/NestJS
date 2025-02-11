import { Property } from "src/entities/property.entity";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export const pgConfig: PostgresConnectionOptions = {
    url: "postgresql://yogurt7v:xxFOI7bvIhmooLqT70vx2QdZDknHLY6T@dpg-culoqolsvqrc73chqe9g-a.oregon-postgres.render.com/realestatedb_wzap",
    type: "postgres",
    port: 5432,
    entities: [__dirname + "/**/*.entity{.ts,.js}"], // добавлены все сущности из данной папки чтобы не заводить руками
    synchronize: true, // только для разработки, НЕ ДЛЯ ПРОДАКШЕНА!!!
    ssl: {
        rejectUnauthorized: false,
    },
}
// убрать потом в .env