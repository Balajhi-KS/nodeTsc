'use strict';

import { Model, DataTypes, Sequelize } from 'sequelize';
import { to } from '../../globalfunction';
import  bcrypt  from 'bcrypt';

interface UserAttributes {
  id: number;
  user_id: string;
  email: string;
  phone: number;
  password: string;
  created: Date;
  modified: Date;
}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    public id!: number;
    public user_id!: string;
    public email!: string;
    public phone!: number;
    public password!: string;
    public created!: Date;
    public modified!: Date;

    static associate(models: any) {
      console.log(models,'modelllllll')
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
    user_id:{
     type: DataTypes.STRING,
    //  allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    password:{
      type: DataTypes.STRING,
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
    }
  }, {
    sequelize,
    modelName: 'User',
    schema: "User",
    tableName: 'users',
    underscored: true,
  });

  User.beforeSave(async (user, options) => {
    let err;
    if (user.changed('password')) {
      let salt, hash;
      let rounds = Math.floor(Math.random() * 6 + 4);
      [err, salt] = await to(bcrypt.genSalt(rounds));
      if (err) {
        console.log(err.message);
      }
      [err, hash] = await to(bcrypt.hash(user.password, salt));
      if (err) {
        console.log(err.message);
      }
      user.password = hash;
    }
  });
    
  return User;
};
