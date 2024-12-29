import { TE, to } from "../../globalfunction";
import { dbInstance } from "../../models";
import {
  CheckUserIdAlreadyExist,
  name,
  user,
  UserDetails,
  WhereCondition,
} from "../../Module";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { CommonSevices } from "../commonService/common.service";
import { ExpenseSevices } from "../expenses/expense.service";
import { Op } from "sequelize";
export class UserSevices {
  userModel: any = dbInstance.user;
  userLoginDetailsModel: any = dbInstance.userLoginDetails;
  public commonSevices: CommonSevices;
  public expenseSevices:ExpenseSevices
  
  constructor() {
    this.commonSevices = new CommonSevices();
    this.expenseSevices = new ExpenseSevices();
  }
  /**
   * Create New user
   * @param body
   * @returns
   */
  registerUser = async (body: user) => {
    let createRandomErr: Error,
      createRandomId: string,
      userErr: Error,
      user: CheckUserIdAlreadyExist;
    [createRandomErr, createRandomId] = await to(
      this.createRandomUserId({
        firstName: body.firstName,
        lastName: body.lastName,
      }, body.email, body.referralCode)
    );
    if (createRandomErr) return TE(createRandomErr.message, true);
    let data = {
      firstName: body.firstName,
      lastName: body.lastName,
      userId: createRandomId,
      email: body.email,
      // phone: body.phone,
      userIncome: body.planingAmount,
      password: body.password,
    };



    [userErr, user] = await to(this.userModel.create(data));
    if (userErr) return TE(userErr.message, true);
    // if (user) {
    //   this.expenseSevices.createCategoryMapping(user);
    // }
    return user;
  };

  /**
   * Create Random user id
   * @param req
   * @param res
   */
  createRandomUserId = async (name: name, email: string, referralCode: string) => {
    let randomUserId: string | null = null;
    let checkUserIdAleadyExistErr: Error,
      checkUserIdAleadyExist;
    let i: number | null = null;
    while (i != 0) {
      randomUserId = (
        name.firstName +
        name.lastName +
        "_" +
        Math.floor(Math.random() * 10000)
      ).toLocaleLowerCase();
      [checkUserIdAleadyExistErr, checkUserIdAleadyExist] = await to(
        this.checkAleadyExist(randomUserId, email, referralCode)
      );
      if (checkUserIdAleadyExistErr) {
        return TE(checkUserIdAleadyExistErr.message, true);
      }
      if (!checkUserIdAleadyExist.userIdExist) {
        break;
      }
    }
    return randomUserId;
  };

  checkAleadyExist = async (userId: string, email: string, referralCode: string) => {
    let checkUserIdAleadyExistErr: Error,
      checkUserIdAleadyExist: CheckUserIdAlreadyExist[] | null;
    [checkUserIdAleadyExistErr, checkUserIdAleadyExist] = await to(
      this.userModel.findAll({
        where: {
          [Op.or]: [
            { email: email },
            { userId: userId },
            { referralCode: referralCode }
          ],
        },
      })
    );
    if (checkUserIdAleadyExist) {
      const { emailExists, userIdExists, referralCodeExists } = this.checkConflicts(checkUserIdAleadyExist, email, userId, referralCode);

      if (emailExists) {
        return TE('mail_Already_exist', true);
      }
      if (userIdExists) {
        return { userIdExist: true };
      }
      if (!referralCodeExists) {
        return TE('invalid_token', true);
      }
    }

    if (checkUserIdAleadyExistErr) return TE(checkUserIdAleadyExistErr.message, true);
    return checkUserIdAleadyExist;
  };

  checkConflicts = (records:CheckUserIdAlreadyExist[], email:string, userId:string, referralCode:string) => {

    let emailExists = false;
    let userIdExists = false;
    let referralCodeExists = false;
  
    for (const record of records) {
      const { email: recordEmail, userId: recordUserId, referralCode: recordReferralCode } = record.dataValues;
  
      if (recordEmail === email) {
        emailExists = true;
      }
      if (recordUserId === userId) {
        userIdExists = true;
      }
      if (recordReferralCode === referralCode) {
        referralCodeExists = true;
      }
  
      // Break early if all checks are done
      if (emailExists && userIdExists && referralCodeExists) {
        break;
      }
    }
  
    return { emailExists, userIdExists, referralCodeExists };
  }


  /**
   * Login User using username and password
   * @param body 
   * @returns 
   */
  loginUser = async (body:UserDetails) => {
    const authenticatedUser = await this.userModel.authenticate(
      body.userName,
      body.password
    );
    
    if (authenticatedUser) {
      let expiration_time = parseInt("15000");

      const keyPair = this.commonSevices.generateRSAKeys();
      const token = this.generateRandomCodeSecure();
      const [createTokenErr, createToken] = await to(
        this.userLoginDetailsModel.create({
          userToken: token,
          loginTime: Date.now(),
          userId: authenticatedUser.id,
          rsakeys: keyPair,
        })
      );

      if (createTokenErr) return TE(createTokenErr.message,true);
      const clonedObject = {
        id: authenticatedUser.id,
        firstName: authenticatedUser.firstName,
        lastName: authenticatedUser.lastName,
        userId: authenticatedUser.userId,
        income: authenticatedUser.userIncome,
        email:authenticatedUser.email,
        validateToken: token,
      };
      let jwtToken =
        "Bearer " +
        jwt.sign(clonedObject, (process.env.SECRETKEY as string), {
          expiresIn: expiration_time,
        });

      return {
        data: {
          encryptionKey: keyPair.publicKey,
          token: this.commonSevices.encryptDetails(
            JSON.stringify({ jwtToken: jwtToken, id: token })
          ),
          UserDetails: clonedObject
        }
      };
    }
    return null;
  };
  generateRandomCodeSecure() {
    const buffer = crypto.randomBytes(8);
    return (
      buffer.readUInt32LE(0).toString() + buffer.readUInt32LE(4).toString()
    );
  }


  checkUserAlreadyExist = async (param: string, userId?: number) => {
    let err: Error, mailExist;
    let whereCondition:WhereCondition = {email: param};
    if (userId && +userId) whereCondition.id = { [Op.not]: userId };

    console.log(whereCondition);
    [err, mailExist] = await to(this.userModel.findOne({
      where: whereCondition
    }));
    if (mailExist) return { mailAlreadyExist: true };
    return { mailAlreadyExist: false };
  }


  editUserDetails = async (body:any,userId: number) => {
    let err: Error, editUser;
    let updateUserDetails: WhereCondition = {};
    if (body?.firstName) updateUserDetails['firstName'] = body.firstName;
    if (body?.lastName) updateUserDetails['lastName'] = body.lastName;
    if (body?.email) updateUserDetails['email'] = body.email;
    if (body?.planingAmount) updateUserDetails['userIncome'] = body.planingAmount;

    
    [err,editUser] = await to(this.userModel.update(updateUserDetails,{
      where: { id: userId }
    }));
    if (editUser) return { mailAlreadyExist: true };
    return { mailAlreadyExist: false };
  }
}
