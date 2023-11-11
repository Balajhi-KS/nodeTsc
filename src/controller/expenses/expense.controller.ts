import express, { Application, Request, Response, NextFunction, Router } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { ExpenseSevices } from '../../services/expenses/expense.service';
// import { GlobalFunction } from '../../globalfunction';
import { TE, to, Reponse, ReE } from '../../globalfunction';
import passport from 'passport';
import { createExpense } from './expense.interface';
export class Expense {
     public express: express.Application;
     public router: express.Router;
     public expenseSevices: ExpenseSevices;
     constructor() {
          this.express = express();
          this.router = express.Router();
          this.expenseSevices = new ExpenseSevices();
     }
     createCategorys = async (req: Request, res: Response) => {
          let err, success;

          if (req && req.body) {
               [err, success] = await to(this.expenseSevices.createCategory(req.body));
          }
          if (err) return ReE(res, err, 422);
          return Reponse(res, { success: "success" }, 200);
     }

     getAllCategory = async (req: Request, res: Response) => {
          let err, success;

          if (req ) {
               [err, success] = await to(this.expenseSevices.getAllCategory());
          }
          console.log(success,'sjhdkjfa/........')
          if (err) return ReE(res, err, 422);
          return Reponse(res, success , 200);
     }

     createDailyExpenses = async (req: Request, res: Response) => {
          let err, success, body: createExpense;

          if (req && req.body) {
               body = req.body;
               let data = {
                    spend: body?.Spend,
                    balance: body?.Balance,
                    reason: body?.Reason
               };
               [err, success] = await to(this.expenseSevices.createDailyExpenses(data));
          }
          if (err) return ReE(res, err, 422);
          return Reponse(res, { success: "Daily Expenses created successfully" }, 200);
     }



     get routes() {
          // passport.authenticate('jwt', { session: false }),
          this.router.post('/category', this.createCategorys);
          this.router.get('/category', this.getAllCategory);
          this.router.post('/daily/expenses', this.createDailyExpenses);
          return this.router;
     }
};
