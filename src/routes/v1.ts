
import express from 'express';
import { ExpenseController } from '../controller/expenses/expense.controller';
import { User } from '../controller/user/user.controller';

export class Routes {
     public express: express.Application;
     public router: express.Router;

     ExpenseController: ExpenseController;
     userController: User;

     constructor() {
          this.express = express();
          this.router = express.Router();
          this.ExpenseController = new ExpenseController();
          this.userController = new User();
     }
     get routers() {
          // this.router.get('/user', this.ExpenseRoute.createCategorys);
          this.router.use('/expense', this.ExpenseController.routes);
          this.router.use('/user', this.userController.routes);

          return this.router;
     }

}