// import { Sequelize } from 'sequelize-typescript';
import { Sequelize } from 'sequelize';
import { DataTypes } from 'sequelize';

import { CONFIG } from '../config/config';
import { CONSTANT } from '../config/contant';
import fs from 'fs';
import path from 'path';
var basename = path.basename(__filename);
console.log('kjdfkjshd');

var db:any = {};
const sequelize = new Sequelize({
     database: CONFIG.db_name,
     username: CONFIG.db_user,
     password: CONFIG.db_password,
     host: CONFIG.db_host,
     dialect: CONFIG.db_dialect,
     port: 5432,
     logging: false,
     define: {
          timestamps: false,
          underscored: true,
     },
     pool: {
          max: 10,
          min: 0,
          acquire: 30000,
          idle: 10000,
     },
     dialectOptions: {
          useUTC: true,
     }
});
   
export {sequelize}