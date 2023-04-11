import ContainerMysql from './ContainerMysql.js';
import { MYSQLCONF } from '../config/config.js';
import createKnexClient from 'knex';
const clientSql = createKnexClient(MYSQLCONF);
const tableName = 'products';


export const ProductsContainer = new ContainerMysql(clientSql, tableName);