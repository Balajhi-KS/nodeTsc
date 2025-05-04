import { Sequelize, QueryTypes } from "sequelize";
import { dbInstance } from "../../models";
import { TE, to } from "../../globalfunction";
import * as models from '../../models/index'
import { createExpenses, createLenderAmount, createLenderDetails, getLendAmountQuery, getLenderDetails, updateLendingAmount } from "../../rawQuery/expenses/Lender.query";
import { TransactionPayload } from "../../Module";

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

    getUserLendingDetails = async (userId: number, query: { id: number }) => {
        let data = {
            lenderId: query?.id,
            userId
        };
        const [getLendAmountErr, getLendAmount] = await to(models.sequelize.query(getLendAmountQuery, {
            type: QueryTypes.SELECT,
            replacements: data
        }));
        if (getLendAmountErr) return TE(getLendAmountErr?.message ?? 'Please enter valid details', true);
        return getLendAmount;
    }

    updateLendingAmount = async (userId: number, body: { id: number, lenderId: number, amount: string }) => {
        console.log('userId: ', userId);
        let data = {
            id:body.id,
            lenderId:body.lenderId,
            amount:body.amount,
            userId,
        };
        const [updateLendAmountErr, updateLendAmount] = await to(models.sequelize.query(updateLendingAmount, {
            type: QueryTypes.UPDATE,
            replacements: data
        }));
        console.log('updateLendAmount: ', updateLendAmount);
        if (updateLendAmountErr) return TE(updateLendAmountErr?.message ?? 'Please enter valid details', true);
        return updateLendAmount[1];
    }


}