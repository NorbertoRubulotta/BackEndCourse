import { MYSQLCONF } from "../config/config.js";
import createKnex from 'knex';

const clientMSql = createKnex(MYSQLCONF);

export async function createTable(tableName) {
    try {
        const table = await clientMSql.schema.hasTable(tableName);
        if (!table) {
            await clientMSql.schema.createTable(tableName, table => {
                table.string('id', 100).primary();
                table.string('title', 100);
                table.float('price', 100);
                table.string('thumbnail', 100);
            });

        }
    } catch (error) {
        throw error;
    }
}