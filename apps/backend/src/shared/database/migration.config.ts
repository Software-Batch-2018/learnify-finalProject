import { DataSource, DataSourceOptions } from "typeorm";
import dotenv from 'dotenv';

dotenv.config();
function getConfig() {
    return {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        synchronize: false,
        migrations: [__dirname + '../../../migrations/*.{ts,js}'],
        entities: [__dirname + '/../**/entity/*.{ts,js}'],
    } as DataSourceOptions;
}

const datasource = new DataSource(getConfig());
datasource.initialize();
export default datasource;