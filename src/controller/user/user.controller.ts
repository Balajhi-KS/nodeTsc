import express, {
  Application,
  Request,
  Response,
  NextFunction,
  Router,
} from "express";
import { UserSevices } from "../../services/user/user.service";
import { ReE, Reponse, TE, to } from "../../globalfunction";
import { CheckUserIdAlreadyExist } from "../../Module";
import passport from "passport";

export class User {
  private router: express.Router;
  private UserSevices: UserSevices;

  /**
   * Init declaration
   */
  constructor() {
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
    let err: Error | null = null, success: CheckUserIdAlreadyExist;

    if (req && req.body) {
      [err, success] = await to(this.UserSevices.registerUser(req.body));
    }
    if (err) return ReE(res, { message: err.message }, 422);
    return Reponse(res, { success: "User Created successfully" }, 200);
  };
  /**
   * Register new user
   * @param req body data
   * @param res success message
   * @returns success message
   */
  loginUser = async (req: Request, res: Response) => {
    let err: Error, response: any;
    if (req && req.body) {
      [err, response] = await to(this.UserSevices.loginUser(req.body));
      if (err) return ReE(res, err, 422);
      if (response) {
        return Reponse(res, response, 200);
      }
      return ReE(res, { message: "invalid Username or password" }, 401);
    }
  };

  mailAlreadyExist = async (req: any, res: Response) => {
    let err: Error, mailExist;
    console.log(req?.user);
    if (req?.body?.email && typeof req.body.email === 'string') {
      [err, mailExist] = await to(this.UserSevices.checkUserAlreadyExist(req.body.email, req?.user?.id));
      if (err) return ReE(res, err, 422);
      return Reponse(res, mailExist, 200);;
    }
  }

  editUserDetails = async (req:any,res:Response)=>{
    let err: Error, editUser;
    if(req?.body && req?.user?.id){
      [err, editUser] = await to(this.UserSevices.editUserDetails(req?.body,req?.user?.id));
      if(err) return ReE(res, err, 422);
      return Reponse(res, editUser, 200);;
    }
  }

  /**
   * Access router
   */
  get routes() {
    this.router.post("/register", this.registerUser);
    this.router.post("/login", this.loginUser);
    this.router.post("/mailExist", this.mailAlreadyExist);
    this.router.post("/mail", passport.authenticate("jwt", { session: false }), this.mailAlreadyExist);
    this.router.put("/edit",passport.authenticate("jwt", { session: false }), this.editUserDetails);
    this.router.get("/temp", (req, res) => {
      res.send(`Hello`);
    });
    return this.router;
  }
}
