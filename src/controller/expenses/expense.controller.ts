import express, { Application, Request, Response, NextFunction, Router } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { ExpenseSevices } from '../../services/expenses/expense.service';
// import { GlobalFunction } from '../../globalfunction';
import { TE, to, Reponse, ReE } from '../../globalfunction';
import passport from 'passport';
import { createExpense ,planingAmount} from './expense.interface';
import { expenseValidator } from '../../validator/experess.validator';
import { validate } from '../../middleware/validate-schema';
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
               [err, success] = await to(this.expenseSevices.getAllCategory(req.user['id']));
          }
          if (err) return ReE(res, err, 422);
          return Reponse(res, { success: success }, 200);
     }

     createDailyExpenses = async (req: Request, res: Response) => {
          let err, success, body: createExpense;
          if (req && req.body) {
               body = req.body;
               let data = {
                    spend: body?.Spend,
                    balance: body?.Balance,
                    reason: body?.Reason,
                    userId:req.user['id'],
                    categoryId: body?.categoryId
               };
               [err, success] = await to(this.expenseSevices.createDailyExpenses(data));
          }
          if (err) return ReE(res, err, 422);
          return Reponse(res, { success: "Daily Expenses created successfully" }, 200);
     }


     createExpensePlaning = async (req: Request, res: Response) => {
          let err, success, body: planingAmount;
          console.log(req.user)
          if (req && req.body) {
               body = req.body;
               let data = {
                    planingAmount:body?.planingAmount,
                    userId:req.user['id'],
                    categoryId: body?.categoryId
               };
               [err, success] = await to(this.expenseSevices.createExpensePlaning(data));
          }
          if (err) return ReE(res, err, 422);
          return Reponse(res, { success: "Daily Expenses created successfully" }, 200);
     }

     getAllExpenses = async (req: Request, res: Response) => {
          let err:Error, success;
          if (req ) {
               [err, success] = await to(this.expenseSevices.getAllExpenses(req.user['id']));
          }
          if (err) return ReE(res, err, 422);
          return Reponse(res, { success: success }, 200);
     }


     get routes() {
          // passport.authenticate('jwt', { session: false }),
          this.router.post('/category', expenseValidator.createCategory,validate ,passport.authenticate('jwt',{session:false}),this.createCategorys);
          this.router.get('/category', passport.authenticate('jwt', { session: false }), this.getAllCategory);
          this.router.get('/expense', passport.authenticate('jwt', { session: false }), this.getAllExpenses);
          this.router.post('/planing', passport.authenticate('jwt', { session: false }), this.createExpensePlaning);
          this.router.post('/daily/expenses', passport.authenticate('jwt', { session: false }), this.createDailyExpenses);
          return this.router;
     }
};
