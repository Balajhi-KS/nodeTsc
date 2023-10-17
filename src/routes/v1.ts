
import express, { Application, Request, Response, NextFunction, Router } from 'express';
import { Expense } from '../controller/expenses/expense.controller';

export class Routes {
     public express: express.Application;
     public router: express.Router;
     controller: Expense;

     constructor() {
          this.express = express();
          this.router = express.Router();
          this.controller = new Expense();
     }
     get routers() {
          // this.router.get('/user', this.controller.createCategorys);
          this.router.use('/user', this.controller.routes);
          return this.router;
     }

}
// export = Routes;
// // var express = require('express');
// // var router = express.Router();
// // var app = express();

// // const passport = require('passport');

// // require('./../middleware/passport')(passport);

// const registerController = require('../controllers/User/register.controller');
// const expenseController = require('../controllers/expenses/expense.controller');
// // const UserAccountController = require('../controllers/userAccount.controller');
// // router.post('/login', UserAccountController.login);
// // router.post('/refreshToken', passport.authenticate('jwt', { session: false }), UserAccountController.refreshToken);

// // router.get('/getEmployees', passport.authenticate('jwt', { session: false }), EmployeeController.getEmployees);
// // router.post('/createEmployee', EmployeeController.createEmployee);

// // router.get('/getDesignation', passport.authenticate('jwt', { session: false }), EmployeeController.getDesignation);
// // router.get('/getRole', passport.authenticate('jwt', { session: false }), EmployeeController.getRole);
// // router.post('/deleteEmployee', passport.authenticate('jwt', { session: false }), EmployeeController.deleteEmployee);

// // router.post('/getEmployee', passport.authenticate('jwt', { session: false }), EmployeeController.getEmployee);
// // router.post('/updateEmployee', passport.authenticate('jwt', { session: false }), EmployeeController.updateEmployee);

// // router.put('/user/register',  registerController.registerUser);

// // router.route('/user',require('../controllers/User/register.controller').router);
// router.use('/user',registerController.router);
// router.use('/expense',expenseController.router);
// module.exports = router;