import sequelize, { Sequelize, Transaction } from "sequelize";
import { TE, to } from "../../globalfunction";
import { dbInstance } from "../../models";
import { Op } from "sequelize";
import { CheckUserIdAlreadyExist, createCategoryInter, createCategoryMappingTnter, createExpensePlaningInter, planingAmount } from "../../Module";
export class ExpenseSevices {
  categoryModel: any = dbInstance.category;
  expensesModel: any = dbInstance.expenses;
  categoryPlaningAmount: any = dbInstance.categoryPlaningAmount;
  /**
   * how you get your Sequelize instance
   */
  private sequelize: Sequelize = dbInstance.sequelize;
  // constructor(){

  // }
  createCategory = async (data: createCategoryInter) => {
    let createCategoryErr: Error,
      createCategorySuccess,
      createCategoryPlanMappingErr: Error,
      createCategoryPlanMapping;
    const transaction: Transaction = await this.sequelize.transaction({ autocommit: false });
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
    } catch (err:any) {
      await transaction.rollback();
      return TE(err.message, true);
    }
    // });

  };

  createExpensePlaning = async (data: createExpensePlaningInter | planingAmount, transaction?: Transaction) =>{
    let createExpensePlaningErr: Error, createExpensePlaningSuccess;

    [createExpensePlaningErr, createExpensePlaningSuccess] = await to(
      this.categoryPlaningAmount.create(data, transaction ? { transaction: transaction } : {})
    );

    if (createExpensePlaningErr)
      return TE(createExpensePlaningErr.message, true);
    return createExpensePlaningSuccess;
  };

  getAllCategory = async (userId: number) => {
    let getAllCategoryErr: Error, getAllCategorySuccess;

    [getAllCategoryErr, getAllCategorySuccess] = await to(
      this.categoryModel.findAll({
        where: { [Op.or]: [{ userId: userId }, { userId: null }] },
        attributes: ["id", "categoryName", "categoryImage"],
      })
    );

    if (getAllCategoryErr) {
      console.log("getAllCategoryErr", getAllCategoryErr);
      return TE(getAllCategoryErr.message, true);
    }
    return getAllCategorySuccess;
  };

  createDailyExpenses = async (data:any) => {
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
          [sequelize.fn("sum", sequelize.col("spend")), "totalAmount"],
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

  /**
   * 
   * @param user 
   * @returns 
   */
  createCategoryMapping = async (user: CheckUserIdAlreadyExist) => {
    let createCategoryMappingErr: Error,
      createCategoryMappingSuccess: createCategoryMappingTnter[],
      addNewCreateCategoryErr: Error,
      addNewCreateCategorySuccess;

    [createCategoryMappingErr, createCategoryMappingSuccess] = await to(
      this.categoryModel.findAll({
        where: { userId: null },
        attributes: ["id", "categoryName", "categoryImage"],
      })
    );

    if (createCategoryMappingErr) {
      return TE(createCategoryMappingErr.message, true);
    }

    let createNewMapping = [];
    for (let i = 0; i < createCategoryMappingSuccess.length; i++) {
      createNewMapping.push({
        categoryName: createCategoryMappingSuccess[i].dataValues.categoryName,
        categoryImage: createCategoryMappingSuccess[i].dataValues.categoryName,
        userId: user.dataValues.id
      });
    }

    [addNewCreateCategoryErr, addNewCreateCategorySuccess] = await to(this.categoryModel.bulkCreate(createNewMapping));

    return createCategoryMappingSuccess;
  }
}
