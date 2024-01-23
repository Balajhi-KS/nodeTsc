'use strict';

import { Model, DataTypes, Sequelize } from 'sequelize';

interface CategoryPlanAttributes {
  id: number;
  planingAmount: number;
  userId: number;
//   categoryName: string;
//   categoryImage: string;
  created: Date;
  modified: Date;
}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class CategoryPlan extends Model<CategoryPlanAttributes> implements CategoryPlanAttributes {
    public id!: number;
    public planingAmount!: number;
    public userId!: number;
    public created!: Date;
    public modified!: Date;

    static associate(models: any) {
        CategoryPlan.belongsTo(models.category, { foreignKey: 'categoryId' });
     //    CategoryPlan.hasMany(models.Category,{foreignKey:'categoryId'});
    }
  }
  
  CategoryPlan.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    planingAmount:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
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
    modelName: 'CategoryPlan',
    schema: "expenses",
    tableName: 'categoryPlan',
    underscored: true,
  });

  return CategoryPlan;
};
