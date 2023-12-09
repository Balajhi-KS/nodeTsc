import express, { Application, Request, Response, NextFunction, Router } from 'express'
import { UserSevices } from '../../services/user/user.service';
import { ReE, Reponse, to } from '../../globalfunction';
import { CheckUserIdAlreadyExist } from '../../services/user/user.interface';


export class User {
     public express: express.Application;
     public router: express.Router;
     public UserSevices: UserSevices;

     /**
      * Init declaration
      */
     constructor() {
          this.express = express();
          this.router = express.Router();
          this.UserSevices = new UserSevices();
     }

     /**
      * Register new user
      * @param req body data
      * @param res success message
      * @returns success message
      */
     registerUser = async (req: Request, res: Response) => {
          let err:Error, success:CheckUserIdAlreadyExist;

          if (req && req.body) {
               [err, success] = await to(this.UserSevices.registerUser(req.body));
          }
          if (err) return ReE(res, err, 422);
          return Reponse(res, { success: "User Created successfully" }, 200);
     }

     /**
      * Access router
      */
     get routes() {
          this.router.post('/register',this.registerUser);
          return this.router;
     }
}