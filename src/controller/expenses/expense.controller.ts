import express, { Application, Request, Response, NextFunction, Router } from 'express'
import expressAsyncHandler from 'express-async-handler'
import {ExpenseSevices}  from '../../services/expenses/expense.service';
// import { GlobalFunction } from '../../globalfunction';
import {TE, to, Reponse, ReE } from '../../globalfunction';

export class Expense {
     public express: express.Application;
     public router: express.Router;
     public expenseSevices:ExpenseSevices;
     constructor() {
          this.express = express();
          this.router = express.Router();
          this.expenseSevices = new ExpenseSevices(); 
          console.log(this.expenseSevices,'expenseSevices');
     }
     createCategorys= async (req: Request, res: Response) =>{
          let err, success;

          if (req && req.query) {
              [err, success] = await to(this.expenseSevices.createCategory(req.query));
          }
          if (err) return ReE(res, err, 422);
          return Reponse(res, {success:"success"}, 200);
     }

     get routes() {
          this.router.post('/add', this.createCategorys);
          return this.router;
     }
};
