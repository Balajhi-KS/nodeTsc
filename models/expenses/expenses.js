// import { Table, Column, Model, DataType } from 'sequelize-typescript';
// @Table
// export class Expenses extends Model<Expenses> {
//   @Column({
//     type: DataType.INTEGER,
//     allowNull: false,
//   })
//   id: number;
//   @Column({
//     type: DataType.INTEGER,
//     allowNull: false,
//   })
//   spend: number;
//   @Column({
//     type: DataType.INTEGER,
//     allowNull: false,
//   })
//   balance: number;
//   @Column({
//     type: DataType.STRING,
//     allowNull: false,
//   })
//   reason: string;
//   @Column({
//     type: DataType.DATE,
//     defaultValue: DataType.NOW,
//     allowNull: false,
//   })
//   created: Date;
//   @Column({
//     type: DataType.DATE,
//     defaultValue: DataType.NOW,
//     allowNull: false,
//   })
//   modified: Date;
// }
// import { Sequelize, DataTypes, Model } from 'sequelize';
// // import { sequelize } from '../index';
// class Expenses extends Model {
//   public id!: number;
//   public spend!: number;
//   public balance!: number;
//   public reason!: string;
//   public createdAt!: Date;
//   public modifiedAt!: Date;
// }
// // Initialize the model
// Expenses.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     spend: {
//       type: DataTypes.INTEGER,
//       allowNull: false
//     },
//     balance: {
//       type: DataTypes.INTEGER,
//       allowNull: false
//     },
//     reason: {
//       type: DataTypes.STRING,
//     },
//     createdAt: {
//       type: DataTypes.DATE,
//     },
//     modifiedAt: {
//       type: DataTypes.DATE,
//     }
//   },
//   {
//     sequelize,
//     modelName: 'Expenses',
//     timestamps: false,
//   }
// );
