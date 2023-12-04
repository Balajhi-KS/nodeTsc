'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends sequelize_1.Model {
        static associate(models) {
            console.log(models, 'modelllllll');
            // User.belongsTo(models.User, { foreignKey: 'UserId' });
            //    User.hasMany(models.expenses,{foreignKey:'UserId'});
            //    User.hasMany(models.UserPlaningAmount,{foreignKey:'UserId'});
        }
    }
    User.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        password: {
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
        modelName: 'User',
        schema: "User",
        tableName: 'users',
        underscored: true,
    });
    return User;
};
