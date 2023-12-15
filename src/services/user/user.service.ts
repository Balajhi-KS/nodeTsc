import { to } from '../../globalfunction';
import { dbInstance } from '../../models';
import { CheckUserIdAlreadyExist, name, user } from './user.interface';
import jwt from 'jsonwebtoken';
export class UserSevices {
     userModel: any = dbInstance.user;

     /**
      * Create New user
      * @param body 
      * @returns 
      */
     registerUser = async (body: user) => {
          let createRandomErr: Error, createRandomId: string, userErr: Error, user: CheckUserIdAlreadyExist;
          [createRandomErr, createRandomId] = await to(this.createRandomUserId({ firstName: body.firstName, lastName: body.lastName }));
          let data = {
               firstName: body.firstName,
               lastName: body.lastName,
               userId: createRandomId,
               email: body.email,
               phone: body.phone,
               password: body.password
          };
          [userErr, user] = await to(this.userModel.create(data));
          if (userErr) return userErr;
          return user;
     }

     /**
      * Create Random user id
      * @param req 
      * @param res 
      */
     createRandomUserId = async (name: name) => {
          let randomUserId: string;
          let checkUserIdAleadyExistErr: Error, checkUserIdAleadyExist: CheckUserIdAlreadyExist | null;
          let i: number;
          while (i != 0) {
               randomUserId = (name.firstName + name.lastName + '_' + Math.floor(Math.random() * 10000)).toLocaleLowerCase();
               [checkUserIdAleadyExistErr, checkUserIdAleadyExist] = await to(this.checkAleadyExist(randomUserId));
               if (checkUserIdAleadyExistErr) {
                    return checkUserIdAleadyExistErr;
               }
               if (checkUserIdAleadyExist == null) {
                    break;
               }
          }
          return randomUserId;
     }

     checkAleadyExist = async (userId: string) => {
          let checkUserIdAleadyExistErr: Error, checkUserIdAleadyExist: CheckUserIdAlreadyExist | null;
          [checkUserIdAleadyExistErr, checkUserIdAleadyExist] = await to(this.userModel.findOne({ where: { userId: userId } }));
          if (checkUserIdAleadyExistErr) return checkUserIdAleadyExistErr;
          return checkUserIdAleadyExist;
     }

     loginUser = async (body) => {
          const authenticatedUser = await this.userModel.authenticate(body.userName, body.password);
          if (authenticatedUser) {
               let expiration_time = parseInt('15000');
               let jwtToken = jwt.sign(authenticatedUser, 'key', { expiresIn: expiration_time });
               return jwtToken;
          }
          return null;
     }

}