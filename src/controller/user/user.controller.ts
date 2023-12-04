import express, { Application, Request, Response, NextFunction, Router } from 'express'
import { UserSevices } from '../../services/user/user.service';
import { ReE, Reponse, to } from '../../globalfunction';


export class User {
     public express: express.Application;
     public router: express.Router;
     public UserSevices: UserSevices;
     constructor() {
          this.express = express();
          this.router = express.Router();
          this.UserSevices = new UserSevices();
     }

     registerUser = async (req: Request, res: Response) => {
          let err, success, body;

          if (req && req.body) {
               body = req.body;
               [err, success] = await to(this.UserSevices.registerUser(body));
          }
          if (err) return ReE(res, err, 422);
          return Reponse(res, { success: "User Created successfully" }, 200);

     }
     get routes() {
          this.router.post('/register',this.registerUser);
          return this.router;
     }
}