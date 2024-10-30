import passport from "passport";
import express, { Request, Response } from "express";

import { to, Reponse, ReE } from "../../globalfunction";
import { validate } from "../../middleware/validate-schema";
import { expenseValidator } from "../../validator/experess.validator";
import { ExpenseSevices } from "../../services/expenses/expense.service";
import {
  createCategoryInter,
  createExpense,
  createExpensePlaningInter,
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


  updateCategory = async (req: any, res: Response) => {
    let err: Error | null = null, success;

    if (req && req.body) {
      
      const value = { 
        userId: req.user.id, 
        id: req.body.id 
      } as createExpensePlaningInter;
      
      if(req.body.categoryName) value['categoryName'] = req.body.categoryName;
      if(req.body.categoryImage) value['categoryImage'] = req.body.categoryImage;
      if(req.body.planingAmount) value['planingAmount'] = req.body.planingAmount;
       
      [err, success] = await to(this.expenseSevices.updateCategory(value));

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
        spend: body?.spendAmount,
        reason: body?.reason,
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



  EditDailyExpenses = async (req: any, res: Response) => {
    let err: Error | null = null, success, body: createExpense;
    if (req && req.body) {
      body = req.body;
      let data = {
        spend: body?.spendAmount,
        reason: body?.reason,
        userId: req.user["id"],
        categoryId: body?.categoryId,
        id:body?.id
      };
      [err, success] = await to(this.expenseSevices.EditDailyExpenses(data));
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
      if(req?.query?.filterData){
        req.query.filterData = JSON.parse(req.query.filterData);
      }
      console.log(req.query,'req.query');
      [err, success] = await to(
        this.expenseSevices.getAllExpenses(req.user.id,req?.query)
      );
    }
    if (err) return ReE(res, err, 422);
    return Reponse(res, { success: success }, 200);
  };



  getSpendByCategory = async (req: any, res: Response) => {
    let err: Error | null = null, success;
    if (req && req?.user) {

      [err, success] = await to(
        this.expenseSevices.getSpendByCategory(req.user.id)
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
      )
      .put(
        passport.authenticate("jwt", { session: false }),
        this.updateCategory
      );

    this.router.get(
      "/all",
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

    this.router.put(
      "/daily/expenses",
      passport.authenticate("jwt", { session: false }),
      this.EditDailyExpenses
    );

    
    this.router.get("/spendByCategory",
      passport.authenticate("jwt", { session: false }),
      this.getSpendByCategory);

    return this.router;
  }
}
