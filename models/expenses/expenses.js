'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Expenses extends sequelize_1.Model {
        // public categoryId!: number;
        static associate(models) {
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
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        created: {
            type: DataTypes.DATE,
            defaultValue: sequelize_1.Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
        },
        modified: {
            type: DataTypes.DATE,
            defaultValue: sequelize_1.Sequelize.literal('CURRENT_TIMESTAMP'),
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
