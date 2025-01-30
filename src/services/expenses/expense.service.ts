import { Sequelize, Transaction, QueryTypes } from "sequelize";
import { TE, to } from "../../globalfunction";
import { dbInstance } from "../../models";
import { Op, col, fn } from "sequelize";
import * as models from '../../models/index'
import {
  categoryCondition,
  CheckUserIdAlreadyExist,
  createCategoryInter,
  createCategoryMappingTnter,
  createExpensePlaningInter,
  planingAmount,
  WhereCondition,
} from "../../Module";
export class ExpenseSevices {
  categoryModel: any = dbInstance.category;
  expensesModel: any = dbInstance.expenses;
  categoryPlaningAmount: any = dbInstance.categoryPlaningAmount;
  // categoryIcon: any = dbInstance.categoryIcon;
  /**
   * how you get your Sequelize instance
   */
  private sequelize: Sequelize = dbInstance.sequelize;
  // constructor(){

  // }
  createCategory = async (data: createExpensePlaningInter) => {
    let createCategoryErr: Error,
      createCategorySuccess,
      createCategoryPlanMappingErr: Error,
      createCategoryPlanMapping;
    const transaction: Transaction = await this.sequelize.transaction({
      autocommit: false,
    });
    try {
      [createCategoryErr, createCategorySuccess] = await to(
        this.categoryModel.create(data, { transaction: transaction })
      );
      if (createCategoryErr) {
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
      await transaction.commit();
      return createCategorySuccess;
    } catch (err: any) {
      await transaction.rollback();
      return TE(err.message, true);
    }
    // });
  };

  createExpensePlaning = async (
    data: createExpensePlaningInter | planingAmount,
    transaction?: Transaction
  ) => {
    let createExpensePlaningErr: Error, createExpensePlaningSuccess;

    [createExpensePlaningErr, createExpensePlaningSuccess] = await to(
      this.categoryPlaningAmount.create(
        data,
        transaction ? { transaction: transaction } : {}
      )
    );

    if (createExpensePlaningErr)
      return TE(createExpensePlaningErr.message, true);
    return createExpensePlaningSuccess;
  };

  updateCategory = async (data: createExpensePlaningInter) => {
    let createCategoryErr: Error,
      createCategorySuccess,
      createCategoryPlanMappingErr: Error,
      createCategoryPlanMapping;

    const transaction: Transaction = await this.sequelize.transaction({
      autocommit: false,
    });

    try {
      const array = ["categoryName", "categoryIcon"];

      if (array.some((res) => data.hasOwnProperty(res))) {
        [createCategoryErr, createCategorySuccess] = await to(
          this.categoryModel.update(data, {
            where: {
              id: data.id,
              userId: data.userId,
            },
            transaction: transaction,
          })
        );

        if (createCategoryErr) {
          return TE(createCategoryErr.message, true);
        }
      }

      if (data.hasOwnProperty("planingAmount") && data?.id) {
        [createCategoryPlanMappingErr, createCategoryPlanMapping] = await to(
          this.updateExpensePlaning(
            {
              planingAmount: data?.planingAmount,
              categoryId: data?.id,
              userId: data.userId,
            },
            transaction
          )
        );

        if (createCategoryPlanMappingErr) {
          return TE(createCategoryPlanMappingErr.message, true);
        }
      }

      await transaction.commit();

      return createCategorySuccess;
    } catch (err: any) {
      await transaction.rollback();
      return TE(err.message, true);
    }
  };

  updateExpensePlaning = async (
    data: planingAmount,
    transaction?: Transaction
  ) => {
    let createExpensePlaningErr: Error, createExpensePlaningSuccess;

    [createExpensePlaningErr, createExpensePlaningSuccess] = await to(
      this.categoryPlaningAmount.findOrCreate({
        where: {
          userId: data.userId,
          categoryId: data.categoryId,
        },
        defaults: {
          planingAmount: data.planingAmount,
          userId: data.userId,
          categoryId: data.categoryId,
        },
        transaction,
      })
    );

    createExpensePlaningSuccess[0].set({
      planingAmount: data.planingAmount,
    });
    await createExpensePlaningSuccess[0].save();

    if (createExpensePlaningErr || !createExpensePlaningSuccess[0])
      return TE(
        createExpensePlaningErr?.message ?? "Unable to Update Category Details",
        true
      );
    return createExpensePlaningSuccess;
  };

  getAllCategory = async (userId: number) => {
    let getAllCategoryErr: Error, getAllCategorySuccess;

    [getAllCategoryErr, getAllCategorySuccess] = await to(
      this.categoryModel.findAll({
        where: { [Op.or]: [{ userId: userId }, { userId: null }] },
        attributes: [
          "id",
          "categoryName",
          "categoryIcon",
          // [
          //   sequelize.literal(`(
          //   SELECT "planing_amount"
          //   FROM "expenses"."categoryPlan"
          //   WHERE "category_id" = "Category"."id"
          //   LIMIT 1
          // )`),
          //   "planingAmount",
          // ],
        ],
      
        // raw: true,
      })
    );

    if (getAllCategoryErr) {
      return TE(getAllCategoryErr.message, true);
    }
    return getAllCategorySuccess;
  };

  createDailyExpenses = async (data: any) => {
    let createCategoryErr: Error, createCategorySuccess;

    [createCategoryErr, createCategorySuccess] = await to(
      this.expensesModel.create(data)
    );

    if (createCategoryErr) {
      return TE(createCategoryErr.message, true);
    }

    return createCategorySuccess;
  };

  EditDailyExpenses = async (data: any) => {
    let editDailyExpensesErr: Error, EditDailyExpensesSuccess;

    [editDailyExpensesErr, EditDailyExpensesSuccess] = await to(
      this.expensesModel.update(data, {
        where: {
          id: data.id,
        },
      })
    );

    if (editDailyExpensesErr) {
      return TE(editDailyExpensesErr.message, true);
    }

    return EditDailyExpensesSuccess;
  };

  getAllExpensess = async (userId: number) => {
    let getExpensesErr: Error, getExpensesSuccess;

    [getExpensesErr, getExpensesSuccess] = await to(
      this.expensesModel.findAll({
        where: {
          userId: userId, // Filter by userId
        },
        attributes: [
          [
            Sequelize.literal(`
                    CASE
                        WHEN "Expenses"."created"::date = CURRENT_DATE THEN 'Today'
                        WHEN "Expenses"."created"::date = CURRENT_DATE - INTERVAL '1 day' THEN 'Yesterday'
                        ELSE TO_CHAR("Expenses"."created"::date, 'DD/MM/YYYY')
                    END
                `),
            "display_date",
          ],
          "spend",
          "reason",
        ],
        include: [
          {
            model: this.categoryModel,
            attributes: ["id", "categoryName", "categoryIcon"],
            required: false, // LEFT OUTER JOIN
          },
        ],
        order: [
          [Sequelize.literal('"Expenses"."created"::date'), "DESC"], // Order by date
          ["spend", "DESC"], // Then by spend
        ],
        raw: true, // Fetch plain data
      })
    );

    if (getExpensesErr) {
      return TE(getExpensesErr.message, true);
    }
    return getExpensesSuccess;
  };

  getAllExpenses = async (
    userId: number,
    query?: { limit: number, offset: number,categoryId:number, filterData: { customDateRange: { begin: Date; end: Date } } }
  ) => {
    let getExpensesErr: Error, getExpensesSuccess;
    let date = new Date(),
      begin,
      end;

    begin =
      query?.filterData?.customDateRange?.begin ??
      new Date(date.getFullYear(), date.getMonth(), 1);
    end =
      query?.filterData?.customDateRange?.end ??
      new Date(date.getFullYear(), date.getMonth() + 1, 0);
     
    let whereCondition:WhereCondition = {
      [Op.or]: [{ userId: userId }],
      created: { [Op.between]: [begin, end] }
    };
    if (query?.categoryId && +query?.categoryId) whereCondition['categoryId'] = +query?.categoryId;

    [getExpensesErr, getExpensesSuccess] = await to(
      this.expensesModel.findAndCountAll({
        where: whereCondition,
        attributes: ["id", "spend", "reason", "created", "isIncome"],
        order: [["created", "DESC"]],
        limit:query?.limit ?? 20,
        offset:query?.offset ?? 0,
        include: [
          {
            required: false,
            model: this.categoryModel,
            attributes: ["id", "categoryIcon","categoryName"],
          },
        ],
      })
    );
    if (getExpensesErr) {
      return TE(getExpensesErr.message, true);
    }
    return getExpensesSuccess;
  };

  getTotalExpenseBalance = async (userId: number,query?: { filterData: { customDateRange: { begin: Date; end: Date } } }) => {
    let getBalance, getBalanceErr;
    let date = new Date(),
    begin,
    end;

    begin =
      query?.filterData?.customDateRange?.begin ??
      new Date(date.getFullYear(), date.getMonth(), 1);
    end =
      query?.filterData?.customDateRange?.end ??
      new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const excuteQuery = `
        SELECT 
          COALESCE(SUM(CASE WHEN is_income = TRUE THEN spend ELSE 0 END), 0) + 
          COALESCE((SELECT CAST(user_income AS BIGINT) FROM "User".users WHERE id = :userId), 0) AS "totalIncome",
          COALESCE(SUM(CASE WHEN is_income = FALSE THEN spend ELSE 0 END), 0) AS "totalSpend",
          COALESCE(
            COALESCE(SUM(CASE WHEN is_income = TRUE THEN spend ELSE 0 END), 0) + 
            COALESCE((SELECT CAST(user_income AS BIGINT) FROM "User".users WHERE id = :userId), 0) - 
            COALESCE(SUM(CASE WHEN is_income = FALSE THEN spend ELSE 0 END), 0),0) AS "totalBalance"
          FROM expenses.expenses 
          WHERE user_id = :userId AND created BETWEEN :begin AND :end; `;

    [getBalanceErr, getBalance] = await to(models.sequelize.query(excuteQuery, {
      type: QueryTypes.SELECT,
      replacements: { 
        userId ,
        begin: begin.toISOString(),
        end: end.toISOString(),
      },
    }));
    if (getBalanceErr) return TE(getBalanceErr.message, true);
    return getBalance;
  }
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
        attributes: ["id", "categoryName", "categoryIcon"],
      })
    );

    if (createCategoryMappingErr) {
      return TE(createCategoryMappingErr.message, true);
    }

    let createNewMapping = [];
    for (let i = 0; i < createCategoryMappingSuccess.length; i++) {
      createNewMapping.push({
        categoryName: createCategoryMappingSuccess[i].dataValues.categoryName,
        categoryIcon: createCategoryMappingSuccess[i].dataValues.categoryIcon,
        userId: user.dataValues.id,
      });
    }

    [addNewCreateCategoryErr, addNewCreateCategorySuccess] = await to(
      this.categoryModel.bulkCreate(createNewMapping)
    );

    return createCategoryMappingSuccess;
  };

  getSpendByCategory = async (userId: number) => {
    let getAllSpendErr, getAllSpendSuccess;

    [getAllSpendErr, getAllSpendSuccess] = await to(
      this.categoryModel.findAll({
        where: { [Op.or]: [{ userId: userId }, { userId: null }] },
        attributes: [
          "id",
          "categoryName",
          [fn("COALESCE", fn("SUM", col("Expenses.spend")), 0), "totalSpend"], // Sum the spend for each category
        ],
        include: [
          {
            model: this.expensesModel,
            attributes: [], // No need to return individual expenses, just the total
          },
        ],
        group: ["Category.id"], // Group by category to calculate total per category
        raw: true, // Fetch plain objects instead of Sequelize instances
      })
    );

    if (getAllSpendErr) return getAllSpendErr;

    return getAllSpendSuccess;
  };

  getExpenseFilter = async (userId: number, query?: { filterData: { customDateRange: { begin: Date; end: Date } } }) => {
   let  getBalanceErr, getBalance;
    const excuteQuery = `
   SELECT TO_CHAR(dates.day, 'MM-DD') AS date,
       COUNT(e.created) AS record_count
        FROM generate_series(
            :begin ::date, 
            :end ::date, 
            '1 day'::interval
        ) AS dates(day)
      LEFT JOIN expenses.expenses e
      ON DATE(e.created) = dates.day
      GROUP BY dates.day
      ORDER BY dates.day;`;

    [getBalanceErr, getBalance] = await to(models.sequelize.query(excuteQuery, {
      type: QueryTypes.SELECT,
      replacements: { 
        userId ,
        begin: begin.toISOString(),
        end: end.toISOString(),
      },
    }));
  }
}
