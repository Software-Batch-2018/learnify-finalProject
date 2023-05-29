import { DataType, newDb } from 'pg-mem';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { v4 } from 'uuid';

export const setupConnection = async (entities: any[]) => {
  const db = newDb({
    autoCreateForeignKeyIndices: true,
  });

  db.public.registerFunction({
    implementation: () => 'test',
    name: 'current_database',
  });

  db.registerExtension('uuid-ossp', (schema) => {
    schema.registerFunction({
      name: 'uuid_generate_v4',
      returns: DataType.uuid,
      implementation: v4,
      impure: true,
    });
  });

  const connection: DataSource = await db.adapters.createTypeormConnection({
    type: 'postgres',
    entities,
    namingStrategy: new SnakeNamingStrategy(),
  });

  await connection.synchronize();

  return connection;
};
