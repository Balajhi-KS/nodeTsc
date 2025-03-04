import express, { Response ,Request } from "express";
import { LenderService } from "../../services/expenses/lender.service";
import passport from "passport";
import { ReE, Reponse, to } from "../../globalfunction";
import { lenderValidator } from "../../validator/lender.validator";
import { validate } from "../../middleware/validate-schema";


export class LenderController {
      private router: express.Router;
      private lenderService: LenderService;
    
      app = express();
    
      constructor() {
        this.router = express.Router();
        this.lenderService = new LenderService();
    }

    getLenderDetails = async (req: any, res: Response) => {
        let err: Error | null = null, success;
        if (req && req?.user) {
            [err, success] = await to(
                this.lenderService.getLenderDetails(req.user.id)
            );
        }
        if (err) return ReE(res, err, 422);
        return Reponse(res, { success: success }, 200);
    }

    createLenderDetails = async (req: any, res: Response) => {
        let err: Error | null = null, success;
        if (req && req?.user) {
            [err, success] = await to(
                this.lenderService.createLenderDetails(req.user.id,req?.body)
            );
        }
        if (err) return ReE(res, err, 422);
        if (success.alreadyExist) return Reponse(res, { alreadyExist: success.alreadyExist }, 200);
        return Reponse(res, { success: 'Lender created sucessfully' }, 200);
    }

    createLendingAmount = async (req: any, res: Response) => {
        let err: Error | null = null, success;
        if (req && req?.user) {
            [err, success] = await to(
                this.lenderService.createLendingAmount(req.user.id, req?.body)
            );
        }
        if (err) return ReE(res, err, 422);
        return Reponse(res, { success: 'Lending Amount created sucessfully' }, 200);
    }

    get routes() {
        this.router.route('/user')
            .get(
                passport.authenticate("jwt", { session: false }),
                this.getLenderDetails)
            .post(
                lenderValidator.createLenderDetails,
                validate,
                passport.authenticate("jwt", { session: false }),
                this.createLenderDetails);
            // .put(
            //     passport.authenticate("jwt", { session: false }),
        //     this.getLenderExpense);
        this.router.route('/')
            .post(
                lenderValidator.createLendingAmount,
                validate,
                passport.authenticate("jwt", { session: false }),
                this.createLendingAmount
            );
        return this.router;
    }
}