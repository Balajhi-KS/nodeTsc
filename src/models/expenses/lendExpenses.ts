"use strict";

import { Model, Sequelize } from "sequelize";

interface LendExpenseAttribute {
    id: number
    amount: string
    isIncome: boolean
    created: Date
    modified: Date
}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
    class LendExpenses extends Model<LendExpenseAttribute> implements LendExpenseAttribute {
        public id!: number;
        public amount!: string;
        public isIncome!: boolean;
        public created!: Date;
        public modified!: Date;
        static associate(models: any) {
            LendExpenses.belongsTo(models.lendUserDetail, { foreignKey: "lendUserId" });
        }
    }
    LendExpenses.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        amount: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isIncome: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
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
            modelName: "LendExpense",
            schema: "expenses",
            tableName: "lendExpense",
            underscored: true
        })
    return LendExpenses;
}