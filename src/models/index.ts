import { Sequelize } from 'sequelize-typescript';
import { CONFIG } from '../config/config';

export const sequelize = new Sequelize({
     database: CONFIG.db_name,
     username: CONFIG.db_user,
     password: CONFIG.db_password,
     host: CONFIG.db_host,
     dialect: CONFIG.db_dialect,
     port: 3306,
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
