'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class UserLoginDetails extends sequelize_1.Model {
        static associate(models) {
            UserLoginDetails.belongsTo(models.user, { foreignKey: 'userId' });
        }
    }
    UserLoginDetails.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userToken: {
            type: DataTypes.STRING,
        },
        loginTime: {
            type: DataTypes.STRING,
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
        modelName: 'UserLoginDetails',
        schema: "User",
        tableName: 'userLoginDetail',
        underscored: true,
    });
    return UserLoginDetails;
};
