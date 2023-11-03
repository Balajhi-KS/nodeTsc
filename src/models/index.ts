import fs from 'fs';
import path from 'path';

import { CONFIG } from '../config/config';
import { CONSTANT } from '../config/contant';
import { Sequelize, DataTypes } from 'sequelize';

var basename = path.basename(__filename);

const db: { [key: string]: any } = {};

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
         CONSTANT.SCHEMAS.forEach(async(item) => {
           if (s.indexOf(item) < 0) {
            await sequelize.createSchema(item,{});
           }
         });
       },
       (err) => {
         console.log("in err", err);
       }
     );
     return schemas;
   };

CONSTANT.SCHEMAS.forEach((item) => {
  fs.readdirSync(path.join(__dirname, item))
    .filter((file) => {
      return (
        file.indexOf(".") !== 0 &&
        file !== basename &&
        file.slice(-3) === ".js"
      );
    })
    .forEach((file) => {
      const model = require(path.join(__dirname, item, file))(
        sequelize,
        DataTypes
      );
      db[file.slice(0, -3)] = model;
      // console.log('in db new', db);
    });
});


   Object.keys(db).forEach((modelName) => {
     if (db[modelName].associate) {
      //  console.log(db[modelName], 'in model');
      db[modelName].associate(db);
    }
  });

  const dbInstance: {
    [key: string]: any;
    schemaCreates: () => Promise<any>;
    sequelize: Sequelize;
    Sequelize: typeof Sequelize;
  } = {
    ...db,
    schemaCreates: async () => {
      const result = await schemaCreate();
      return result;
    },
    sequelize,
    Sequelize,
  };
  // console.log('db',db)
  dbInstance.schemaCreates();
// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// export {sequelize}
export {dbInstance ,sequelize};
