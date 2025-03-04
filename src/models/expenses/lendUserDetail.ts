"use strict";

import { Model, Sequelize } from "sequelize";

interface LendUserDetailsAttribute {
    id: number
    userId: number
    name: string
    created: Date
    modified: Date
}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
    class LendUserDetails extends Model<LendUserDetailsAttribute> implements LendUserDetailsAttribute {
        public id!: number;
        public userId!: number;
        public name!: string;
        public created!: Date;
        public modified!: Date;
        static associate(models: any) {
            LendUserDetails.hasMany(models.lendExpenses, { foreignKey: "lendUserId" });
        }
    }
    LendUserDetails.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
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
        }
    },
        {
            sequelize,
            modelName: "LendUserDetail",
            schema: "expenses",
            tableName: "lendUserDetail",
            underscored: true
        })
    return LendUserDetails;
}