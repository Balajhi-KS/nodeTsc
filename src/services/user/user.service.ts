import { to } from '../../globalfunction';
import { dbInstance } from '../../models';
export class UserSevices {
     userModel: any = dbInstance.user;

     registerUser = async (body) => {
          console.log(body,'daaaaaaaa')
          let [userErr, user] = await to(this.userModel.create(body));
          return user;
     }
}