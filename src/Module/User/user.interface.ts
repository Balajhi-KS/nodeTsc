import { Request } from "express";


interface user {
  firstName: string;
  lastName: string;
  userId: string;
  email: string;
  phone: string;
  password: string;
}
interface name {
  firstName: string;
  lastName: string;
}

interface UserModelAttributes {
  id: number;
  firstName: string;
  lastName: string;
  userId: string;
  email: string;
  phone: string;
  password: string;
  created: Date;
  modified: Date;
}

interface CheckUserIdAlreadyExist {
  dataValues: UserModelAttributes;
}

interface UserDetails {
  userName: string,
  password: string
}

interface UserRequestToken {
  user: {id?: number};
  body :any
}
export { user, name, CheckUserIdAlreadyExist,UserDetails ,UserRequestToken};
