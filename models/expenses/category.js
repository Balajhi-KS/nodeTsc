'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Category extends sequelize_1.Model {
        static associate(models) {
            // Category.belongsTo(models.category, { foreignKey: 'categoryId' });
            Category.hasMany(models.expenses, { foreignKey: 'categoryId' });
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
        modelName: 'Category',
        schema: "expenses",
        tableName: 'category',
        underscored: true,
    });
    return Category;
};
