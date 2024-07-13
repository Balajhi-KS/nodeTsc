import { to } from "../../globalfunction";
import { dbInstance } from "../../models";
import {
  CheckUserIdAlreadyExist,
  name,
  user,
  UserDetails,
} from "../../Module";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { CommonSevices } from "../commonService/common.service";
import { ExpenseSevices } from "../expenses/expense.service";
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
      })
    );

    let data = {
      firstName: body.firstName,
      lastName: body.lastName,
      userId: createRandomId,
      email: body.email,
      phone: body.phone,
      password: body.password,
    };

    [userErr, user] = await to(this.userModel.create(data));
    if (userErr) return userErr;
    if(user){
      this.expenseSevices.createCategoryMapping(user);
    }
    return user;
  };

  /**
   * Create Random user id
   * @param req
   * @param res
   */
  createRandomUserId = async (name: name) => {
    let randomUserId: string | null = null;
    let checkUserIdAleadyExistErr: Error,
      checkUserIdAleadyExist: CheckUserIdAlreadyExist | null;
    let i: number | null = null;
    while (i != 0) {
      randomUserId = (
        name.firstName +
        name.lastName +
        "_" +
        Math.floor(Math.random() * 10000)
      ).toLocaleLowerCase();
      [checkUserIdAleadyExistErr, checkUserIdAleadyExist] = await to(
        this.checkAleadyExist(randomUserId)
      );
      if (checkUserIdAleadyExistErr) {
        return checkUserIdAleadyExistErr;
      }
      if (checkUserIdAleadyExist == null) {
        break;
      }
    }
    return randomUserId;
  };

  checkAleadyExist = async (userId: string) => {
    let checkUserIdAleadyExistErr: Error,
      checkUserIdAleadyExist: CheckUserIdAlreadyExist | null;

    [checkUserIdAleadyExistErr, checkUserIdAleadyExist] = await to(
      this.userModel.findOne({
        where: { userId: userId },
      })
    );

    if (checkUserIdAleadyExistErr) return checkUserIdAleadyExistErr;
    return checkUserIdAleadyExist;
  };

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

      if (createTokenErr) return createTokenErr.message;
      const clonedObject = {
        id: authenticatedUser.id,
        firstName: authenticatedUser.firstName,
        lastName: authenticatedUser.lastName,
        userId: authenticatedUser.userId,
        validateToken: token,
      };
      let jwtToken =
        "Bearer " +
        jwt.sign(clonedObject, (process.env.SECRETKEY as string), {
          expiresIn: expiration_time,
        });

      return {
        encryptionKey: keyPair.publicKey,
        token: this.commonSevices.encryptDetails(
          JSON.stringify({ jwtToken: jwtToken, id: token })
        ),
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
}
