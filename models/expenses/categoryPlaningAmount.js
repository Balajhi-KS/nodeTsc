'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class CategoryPlan extends sequelize_1.Model {
        static associate(models) {
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
        planingAmount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
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
