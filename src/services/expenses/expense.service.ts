// import { GlobalFunction } from "../../globalfunction";
import sequelize, { Model, Transaction } from "sequelize";
import { TE, to } from "../../globalfunction";
import { dbInstance } from "../../models"; // Update the path to the correct location
// import { Expenses } from '../../models/expenses'; // Update the path to the correct location
// const { Category } = require('./models');
// import { Category } from '../../models' as any;
import { Op } from "sequelize";
import { createCategoryInter, createExpensePlaningInter } from '../../Module/expenses/expense.interface'
export class ExpenseSevices {
  categoryModel: any = dbInstance.category;
  expensesModel: any = dbInstance.expenses;
  categoryPlaningAmount: any = dbInstance.categoryPlaningAmount;

  // constructor(){

  // }
  createCategory = async (data: createCategoryInter) => {
    let createCategoryErr: Error,
      createCategorySuccess,
      createCategoryPlanMappingErr: Error,
      createCategoryPlanMapping;
    // return await Model.sequelize.transaction({ autocommit: false }).then(async t => {
    const transaction = await Model.sequelize.transaction({ autocommit: false });

    try {
      [createCategoryErr, createCategorySuccess] = await to(
        this.categoryModel.create(data, { transaction: transaction })
      );
      if (createCategoryErr) {
        console.log("createCategoryErr", createCategoryErr);
        return TE(createCategoryErr.message, true);
      }
      if (createCategorySuccess.dataValues.id) {
        let value = {
          planingAmount: data?.planingAmount,
          userId: data.userId,
          categoryId: createCategorySuccess.dataValues.id,
        };
        [createCategoryPlanMappingErr, createCategoryPlanMapping] = await to(
          this.createExpensePlaning(value, transaction)
        );
        if (createCategoryPlanMappingErr) {
          return TE(createCategoryPlanMappingErr.message, true);
        }
      }
      await transaction.commit()
      return createCategorySuccess;
    } catch (err) {
      await transaction.rollback();
      return TE(err.message, true);
    }
    // });

  };

  createExpensePlaning = async function (data:createExpensePlaningInter,transaction:Transaction) {
    let createExpensePlaningErr:Error, createExpensePlaningSuccess;
    [createExpensePlaningErr, createExpensePlaningSuccess] = await to(
      this.categoryPlaningAmount.create(data,{ transaction: transaction })
    );
    if (createExpensePlaningErr)
      return TE(createExpensePlaningErr.message, true);
    return createExpensePlaningSuccess;
  };

  getAllCategory = async (userId: number) => {
    let createCategoryErr: Error, createCategorySuccess;
    [createCategoryErr, createCategorySuccess] = await to(
      this.categoryModel.findAll({
        where: { [Op.or]: [{ userId: userId }, { userId: null }] },
        attributes: ["id", "categoryName", "categoryImage"],
      })
    );
    if (createCategoryErr) {
      console.log("createCategoryErr", createCategoryErr);
      return TE(createCategoryErr.message, true);
    }
    return createCategorySuccess;
  };

  createDailyExpenses = async (data) => {
    let createCategoryErr: Error, createCategorySuccess;
    [createCategoryErr, createCategorySuccess] = await to(
      this.expensesModel.create(data)
    );
    if (createCategoryErr) {
      console.log("createCategoryErr", createCategoryErr);
      return TE(createCategoryErr.message, true);
    }
    return createCategorySuccess;
  };



  getAllExpenses = async (userId: number) => {
    let getExpensesErr: Error, getExpensesSuccess;

    [getExpensesErr, getExpensesSuccess] = await to(
      this.categoryModel.findAll({
        where: { [Op.or]: [{ userId: userId }, { userId: null }] },
        attributes: [
          "id",
          "categoryName",
          "categoryImage",
          [sequelize.fn("sum", sequelize.col("spend")), "total_amount"],
        ],
        include: [
          {
            required: false,
            model: this.expensesModel,
            attributes: ["id", "spend", "balance", "reason"],
          },
          {
            model: this.categoryPlaningAmount,
            required: false,
            where: { userId: userId },
            attributes: ["id", "planingAmount"],
          },
        ],
        group: [
          "Category.id",
          "CategoryPlans.id",
          "Category.category_name",
          "Category.category_image",
          "Expenses.id",
          "Expenses.spend",
          "Expenses.balance",
          "Expenses.reason",
        ],
      })
    );
    if (getExpensesErr) {
      console.log("getExpensesErr", getExpensesErr);
      return TE(getExpensesErr.message, true);
    }
    return getExpensesSuccess;
  };
}
