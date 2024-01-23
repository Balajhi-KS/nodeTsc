'use strict';

import { Model, DataTypes, Sequelize } from 'sequelize';

interface CategoryAttributes {
  id: number;
  userId: number;
  categoryName: string;
  categoryImage: string;
  created: Date;
  modified: Date;
}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class Category extends Model<CategoryAttributes> implements CategoryAttributes {
    public id!: number;
    public userId!: number;
    public categoryName!: string;
    public categoryImage!: string;
    public created!: Date;
    public modified!: Date;

    static associate(models: any) {
      Category.hasMany(models.expenses, { foreignKey: 'categoryId' });
      Category.hasMany(models.categoryPlaningAmount, { foreignKey: 'categoryId' });
    }
  }
  
  Category.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    categoryImage:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    created: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
    modified: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Category',
    schema: "expenses",
    tableName: 'category',
    underscored: true,
  });

  return Category;
};
