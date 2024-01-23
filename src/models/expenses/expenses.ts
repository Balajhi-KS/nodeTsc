'use strict';

import { Model, DataTypes, Sequelize } from 'sequelize';

interface ExpensesAttributes {
  id: number;
  spend: number;
  balance: number;
  userId: number;
  reason: string;
  created: Date;
  modified: Date;
  // categoryId: number;
}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class Expenses extends Model<ExpensesAttributes> implements ExpensesAttributes {
    public id!: number;
    public spend!: number;
    public balance!: number;
    public userId!: number;
    public reason!: string;
    public created!: Date;
    public modified!: Date;
    // public categoryId!: number;

    static associate(models: any) {
      Expenses.belongsTo(models.category, { foreignKey: 'categoryId' });
    }
  }

  Expenses.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    spend: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId:{
      type: DataTypes.INTEGER,
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
    },
    // categoryId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    // },
  }, {
    sequelize,
    modelName: 'Expenses',
    schema: "expenses",
    tableName: 'expenses',
    underscored: true,
  });

  return Expenses;
};
