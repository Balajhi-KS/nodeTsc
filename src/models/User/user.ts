"use strict";

import { Model,Sequelize } from "sequelize";
import crypto from "crypto";

interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  userId: string;
  email: string;
  userIncome: string;
  phone: number;
  created: Date;
  modified: Date;
  password?: string;
}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public userId!: string;
    public email!: string;
    public phone!: number;
    public password!: string;
    public userIncome!: string;
    public created!: Date;
    public modified!: Date;

    // public username!: string;
    // public checkPassword!: string;
    // public salt!: string;
    static associate(models: any) {
      User.hasMany(models.userLoginDetails, { foreignKey: "userId" });
    }
    static authenticate = async (
      email: string,
      password: string
    ): Promise<User | null> => {
      const user = await this.findOne({
        where: { email },
        attributes: [
          "id",
          "firstName",
          "lastName",
          "userId",
          "email",
          "phone",
          "userIncome",
          "password",
        ],
      });
      if (user && user.dataValues?.password) {
        const salt = user?.dataValues?.password.slice(0, 16);
        if (user?.dataValues?.password && salt) {
          let hash: any;
          hash = crypto.createHash("sha256");
          hash.update(password + salt);
          if (user?.dataValues?.password === salt + hash.digest("hex")) {
            delete user?.dataValues?.password;
            return user;
          }
        }
      }

      return null;
    };
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userIncome:{
        type:DataTypes.STRING
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
      modelName: "User",
      schema: "User",
      tableName: "users",
      underscored: true,
    }
  );

  User.beforeSave(async (user, options) => {
    if (user.changed("password")) {
      let salt: string, hash: any;
      salt = crypto.randomBytes(8).toString("hex");
      hash = crypto.createHash("sha256");
      hash.update(user.password + salt);
      user.password = salt + hash.digest("hex");
    }
  });

  return User;
};
