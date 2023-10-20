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
const schemaCreate = async function () {
     // const test = [];
     var schemas = await sequelize.showAllSchemas({}).then(
       (s) => {
         CONSTANT.SCHEMAS.forEach((item) => {
           if (s.indexOf(item) < 0) {
             sequelize.createSchema(item,{}).then((res) => { });
           }
         });
       },
       (err) => {
         console.log("in err", err);
       }
     );
     return schemas;
   };

//    CONSTANT.SCHEMAS.forEach((item:string) => {
//      fs.readdirSync(__dirname + "/" + item)
//        .filter((file:string) => {
//          return (
//            file.indexOf(".") !== 0 &&
//            file !== basename &&
//            file.slice(-3) === ".js"
//          );
//        })
//        .forEach((file:string) => {
//          // console.log(file, "in file val");
//          // if (file.indexOf('users.js') >= 0) {
//          var model = require(path.join(__dirname + "/" + item, file)).default;
//          db[file.slice(0, -3)] = model(sequelize, DataTypes);
//          // }
 
//          // console.log('in db new', db);
//        });
//    });
CONSTANT.SCHEMAS.forEach(async (item: string) => {
     const files = await fs.promises.readdir(path.join(__dirname, item));
     for (const file of files) {
       if (file.indexOf(".") !== 0 && file.slice(-3) === ".js") {
         const model = require(path.join(__dirname, item, file));
         if (model) {
           db[file.slice(0, -3)] = model(sequelize, DataTypes);
          }
          console.log(db,model,'djkhfjksd');
       }
     }
   });
   Object.keys(db).forEach((modelName) => {
    // console.log(modelName, 'in model', db['addresses']);
    if (db[modelName].association) {
      db[modelName].association(db);
    }
  });
db.schemaCreate = schemaCreate();
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export {sequelize}