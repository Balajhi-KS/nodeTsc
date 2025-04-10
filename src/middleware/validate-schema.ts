import { NextFunction, Request, RequestHandler, Response } from "express";
import { validationResult, checkExact, matchedData } from "express-validator";

const validate: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  await checkExact(
    [], {
    message: fields => {
      const [field] = fields;
      return `Unknown field ${field.path} in ${field.location} with value ${field.value}`;
    }, locations: ['body', 'query', 'params']
  }).run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array(),
    });
    return;
  }
  next();
};

export { validate };
