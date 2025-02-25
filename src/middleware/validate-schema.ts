import { NextFunction, Request, RequestHandler, Response } from "express";
import { validationResult } from "express-validator";
import memoryCache from "./memory.cache";

const validate: RequestHandler = (req:Request, res:Response, next:NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array(),
    });
    return;
  }
  next();
};

const checkIfUserValid = (req: Request | any, res: Response, next: NextFunction) => {
  const getTokenBy= 'tokenId_' + req?.user?.id;
  const memory = memoryCache.get(getTokenBy);
  if ((memory !== req?.user?.validateToken) || !memory) {
    res.status(401).send('unauthorized');
    return;
  }
  next();
}
export { validate, checkIfUserValid };
