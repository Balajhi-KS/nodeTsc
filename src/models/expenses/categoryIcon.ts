"use strict";

import { Model, Sequelize } from "sequelize";

interface CategoryIconAttributes {
     id: number;
     categoryIcon: JSON;
     created: Date;
     modified: Date;
}
module.exports = (sequelize: Sequelize, DataTypes: any) => {
     class CategoryIcon
     extends Model<CategoryIconAttributes>
     implements CategoryIconAttributes
   {
     public id!: number;
     public categoryIcon!: JSON;
     public created!: Date;
     public modified!: Date;
 
     static associate(models: any) {
          CategoryIcon.belongsTo(models.category, { foreignKey: "categoryId" });
          CategoryIcon.hasMany(models.expenses, { foreignKey: "categoryIconId" });
     }
   }
   CategoryIcon.init({
     id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        categoryIcon: {
          type: DataTypes.JSON,
          allowNull: false,
        },
        created: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          allowNull: false,
        },
        modified: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          allowNull: false,
        },
   },
   {
     sequelize,
     modelName: "CategoryIcon",
     schema: "expenses",
     tableName: "categoryIcon",
     underscored: true,
   });
   return CategoryIcon;
}