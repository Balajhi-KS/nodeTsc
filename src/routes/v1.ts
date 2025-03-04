import express from "express";
import { ExpenseController } from "../controller/expenses/expense.controller";
import { User } from "../controller/user/user.controller";
import { LenderController } from "../controller/expenses/lender.controller";

export class Routes {
  public express: express.Application;
  public router: express.Router;

  ExpenseController: ExpenseController;
  userController: User;
  lenderController: LenderController;
  
  constructor() {
    this.express = express();
    this.router = express.Router();
    this.ExpenseController = new ExpenseController();
    this.userController = new User();
    this.lenderController = new LenderController();
  }
  get routers() {
    // this.router.get('/user', this.ExpenseRoute.createCategorys);
    this.router.use("/expense", this.ExpenseController.routes);
    this.router.use("/lend",this.lenderController.routes)
    this.router.use("/user", this.userController.routes);

    return this.router;
  }
}
