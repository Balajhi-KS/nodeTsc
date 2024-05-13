import Sequelize from "sequelize";

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
// interface UserModelInstance extends Sequelize.Instance<UserModelAttributes>, UserModelAttributes { }

// Create an interface for your specific instance
interface CheckUserIdAlreadyExist {
  dataValues: UserModelAttributes;
  uniqno: number;
  _previousDataValues: UserModelAttributes;
  _changed: Set<any>;
  _options: {
    isNewRecord: boolean;
    _schema: string;
    _schemaDelimiter: string;
    raw: boolean;
    attributes: string[];
  };
  isNewRecord: boolean;
}

export { user, name, CheckUserIdAlreadyExist };
