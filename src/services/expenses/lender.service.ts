import { Sequelize, QueryTypes } from "sequelize";
import { dbInstance } from "../../models";
import { TE, to } from "../../globalfunction";
import * as models from '../../models/index'
import { createLenderAmount, createLenderDetails, getLenderDetails } from "../../rawQuery/expenses/Lender.query";

export class LenderService {
    private sequelize: Sequelize = dbInstance.sequelize;

    getLenderDetails = async (userId: number) => {
        const [err, response] = await to(models.sequelize.query(getLenderDetails, {
            type: QueryTypes.SELECT,
            replacements: {
                userId
            }
        }));
        if (err) return TE(err.message, true);
        return response;
    }

    createLenderDetails = async (userId: number, body: { name: string }) => {
        let data = {
            userId,
            name:body?.name
        };
       const [createUserErr, createUser] = await to(models.sequelize.query(createLenderDetails, {
           type: QueryTypes.INSERT,
           replacements: data
       }));
        
       console.log('createUser: ', createUser);
       if (createUserErr) return TE(createUserErr.message, true);
       if (createUser[0].length > 0) return createUser[0];
       return { alreadyExist: true };
    }

    createLendingAmount = async (userId: number, body: { amount: number, isIncome: boolean, lenderId: number }) => {
        let data = {
            userId,
            amount: body?.amount,
            isIncome: body?.isIncome,
            lenderId: body?.lenderId
        };
        const [createLendErr, createLend] = await to(models.sequelize.query(createLenderAmount, {
            type: QueryTypes.INSERT,
            replacements: data
        }));
        if (createLendErr) return TE(createLendErr?.message ?? 'Please enter valid details', true);
        const affectedRows = createLend[1];

        if (affectedRows === 0) {
            return TE('Please enter valid details: Lender ID or User ID might be incorrect.', true);
        }

        return createLend[0];
    }
}