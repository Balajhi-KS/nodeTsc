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

export { user, name, CheckUserIdAlreadyExist };
