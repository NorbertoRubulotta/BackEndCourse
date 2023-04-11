import { mysqlConfig } from "../config/config.js";
import createKnex from 'knex';


const clientMySql = createKnex(mysqlConfig);

export async function createTable(tableName) {
    try {
        const table = await clientMySql.schema.hasTable(tableName);
        if (!table) {
            await clientMySql.schema.createTable(tableName, table => {
                table.string('id', 100).primary();
                table.string('email', 100);
                table.string('message', 100);
            });

        }
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
}
