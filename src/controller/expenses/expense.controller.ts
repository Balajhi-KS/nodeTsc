import passport from "passport";
import express, { Request, Response } from "express";

import { to, Reponse, ReE } from "../../globalfunction";
import { validate } from "../../middleware/validate-schema";
import { expenseValidator } from "../../validator/experess.validator";
import { ExpenseSevices } from "../../services/expenses/expense.service";
import {
  createExpense,
  planingAmount,
  UserRequestToken,
} from "../../Module";

export class ExpenseController {
  private router: express.Router;
  private expenseSevices: ExpenseSevices;

  app = express();

  constructor() {
    this.router = express.Router();
    this.expenseSevices = new ExpenseSevices();
  }

  createCategorys = async (req: any, res: Response) => {
    let err: Error | null = null, success;

    if (req && req.body) {

      const value = {
        categoryName: req.body.categoryName,
        categoryImage: req.body.categoryImage,
        planingAmount: req.body.planingAmount,
        userId: req.user.id,
      };

      [err, success] = await to(this.expenseSevices.createCategory(value));

    }

    if (err) return ReE(res, err, 422);

    return Reponse(res, { success: "success" }, 200);

  };



  getAllCategory = async (req: any, res: Response) => {
    let err: Error | null = null, success;

    if (req) {

      [err, success] = await to(
        this.expenseSevices.getAllCategory(req.user.id)
      );

    }

    if (err) return ReE(res, err, 422);

    return Reponse(res, { success: success }, 200);
  };

  createDailyExpenses = async (req: any, res: Response) => {
    let err: Error | null = null, success, body: createExpense;
    if (req && req.body) {
      body = req.body;
      let data = {
        spend: body?.Spend,
        balance: body?.Balance,
        reason: body?.Reason,
        userId: req.user["id"],
        categoryId: body?.categoryId,
      };
      [err, success] = await to(this.expenseSevices.createDailyExpenses(data));
    }
    if (err) return ReE(res, err, 422);
    return Reponse(
      res,
      { success: "Daily Expenses created successfully" },
      200
    );
  };

  createExpensePlaning = async (req: any, res: Response) => {
    let err: Error | null = null, success, body: planingAmount;
    console.log(req.body);
    if (req && req.body) {
      body = req.body;
      let data = {
        planingAmount: body?.planingAmount,
        userId: req.user["id"],
        categoryId: body?.categoryId,
      };
      [err, success] = await to(this.expenseSevices.createExpensePlaning(data));

      if (err) return ReE(res, err, 422);
      return Reponse(
        res,
        { success: "Daily Expenses created successfully" },
        200
      );
    }
    return ReE(res, 'Missing Body Data', 422)
  };

  getAllExpenses = async (req: any, res: Response) => {
    let err: Error | null = null, success;
    if (req && req?.user) {

      [err, success] = await to(
        this.expenseSevices.getAllExpenses(req.user.id)
      );
    }
    if (err) return ReE(res, err, 422);
    return Reponse(res, { success: success }, 200);
  };

  get routes() {
    this.app.use("/", this.router);

    this.router
      .route("/category")
      .post(
        expenseValidator.createCategory,
        validate,
        passport.authenticate("jwt", { session: false }),
        this.createCategorys
      )
      .get(
        passport.authenticate("jwt", { session: false }),
        this.getAllCategory
      );

    this.router.get(
      "/expense",
      passport.authenticate("jwt", { session: false }),
      this.getAllExpenses
    );

    this.router.post(
      "/planing",
      expenseValidator.createPlanningAmount,
      validate,
      passport.authenticate("jwt", { session: false }),
      this.createExpensePlaning
    );

    this.router.post(
      "/daily/expenses",
      passport.authenticate("jwt", { session: false }),
      this.createDailyExpenses
    );
    return this.router;
  }
}
