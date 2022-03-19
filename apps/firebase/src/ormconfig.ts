import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { DataSource } from "typeorm";

import { ns } from "./common/constants";
import { UserEntity } from "./user/user.entity";
import { CreateSchema1561991006215 } from "./migrations/1561991006215-create-schema";
import { CreateUserTable1562222612033 } from "./migrations/1562222612033-create-user-table";
import { SeedUsers1563804021014 } from "./migrations/1563804021014-seed-users";

// Check typeORM documentation for more information.
const config: PostgresConnectionOptions = {
  name: "default",
  type: "postgres",
  url: process.env.POSTGRES_URL,
  // prettier-ignore
  entities: [
    UserEntity,
  ],
  // We are using migrations, synchronize should be set to false.
  synchronize: false,
  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: process.env.NODE_ENV !== "production",
  migrationsTableName: ns,
  namingStrategy: new SnakeNamingStrategy(),
  logging: process.env.NODE_ENV === "development",
  // logger: 'file',
  // Allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev.
  migrations: [CreateSchema1561991006215, CreateUserTable1562222612033, SeedUsers1563804021014],
  cli: {
    // Location of migration should be inside src folder
    // to be compiled into dist/ folder.
    migrationsDir: "src/migrations",
  },
};

export default config;

export const dataSource = new DataSource(config);
