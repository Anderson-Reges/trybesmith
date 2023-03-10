import { NextFunction, Response, Request } from 'express';
import statusCodes from '../statusCodes';
import { productSchema } from './schemas';

const validateProductValues = (req: Request, res: Response, next: NextFunction) => {
  const productValues = req.body;

  const data = productSchema.safeParse(productValues);

  if (!data.success) {
    const { message } = data.error.issues[0];
    return message.includes('required') 
      ? res.status(statusCodes.BAD_REQUEST).json({ message })
      : res.status(statusCodes.Unprocessable_Entity).json({ message });
  }

  next();
};

export default validateProductValues;