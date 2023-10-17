import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Expenses extends Model<Expenses> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  spend: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  balance: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  reason: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    allowNull: false,
  })
  created: Date;
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    allowNull: false,
  })
  modified: Date;
}

