import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import InvalidDataException from '../exceptions/InvalidDataException';
import InvalidTypeException from '../exceptions/InvalidTypeException';


export const checkIfMeasureUUIDUrlParamIsValid = (req: Request, res: Response, next: NextFunction) => {
  const { customerId } = req.params;
  const schema = z.string().uuid();

  const result = schema.safeParse(customerId);

  if (!result.success) throw new InvalidDataException('Customer UUID is not valid');

  next();
}

export const checkIfMeasureTypeQueryParamIsValid = (req: Request, res: Response, next: NextFunction) => {
  const { measureType } = req.query;
  if (typeof measureType === "undefined") return next();
  const availableMeasureType = ['WATER', 'GAS'] as const;
  
  const schema = z.enum(availableMeasureType);
  const result = schema.safeParse(measureType);

  if (!result.success) throw new InvalidTypeException('Tipo de medição não permitida');

  next();
}