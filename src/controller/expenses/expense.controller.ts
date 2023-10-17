import express, { Application, Request, Response, NextFunction, Router } from 'express'
import expressAsyncHandler from 'express-async-handler'

export class Expense {
     public express: express.Application;
     public router: express.Router;
     constructor() {
          this.express = express();
          this.router = express.Router();
     }
     createCategorys = async function (req: Request, res: Response) {
          let err, success;
          // if (req && req.body) {
          //     [err, success] = await to(expenseSevices.createCategory(req.body));
          // }
          // if (err) return ReE(res, err, 422);
          // return Reponse(res, {success:"success"}, 200);
          res.send('Heylo')
     }

     get routes() {

          this.router.get('/get', this.createCategorys);
          return this.router;
     }
};
