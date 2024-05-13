"use strict";

import { Model, DataTypes, Sequelize } from "sequelize";

interface UserUserLoginDetailsAttributes {
  id: number;
  userToken: string;
  loginTime: Date;
  rsakeys: JSON;
  created: Date;
  modified: Date;
}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class UserLoginDetails
    extends Model<UserUserLoginDetailsAttributes>
    implements UserUserLoginDetailsAttributes
  {
    public id!: number;
    public userToken!: string;
    public loginTime!: Date;
    public rsakeys!: JSON;
    public created!: Date;
    public modified!: Date;
    static associate(models: any) {
      UserLoginDetails.belongsTo(models.user, { foreignKey: "userId" });
    }
  }

  UserLoginDetails.init(
    {
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
      rsakeys: {
        type: DataTypes.JSON,
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
      },
    },
    {
      sequelize,
      modelName: "UserLoginDetails",
      schema: "User",
      tableName: "userLoginDetail",
      underscored: true,
    }
  );
  return UserLoginDetails;
};
