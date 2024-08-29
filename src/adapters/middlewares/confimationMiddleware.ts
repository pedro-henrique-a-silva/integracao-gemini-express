import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import InvalidDataException from '../exceptions/InvalidDataException';

export const checkIfMeasureUUIDIsValid = (req: Request, res: Response, next: NextFunction) => {
  const { measure_uuid: measureUUID } = req.body;

  const schema = z.string().uuid();

  const result = schema.safeParse(measureUUID);

  if (!result.success) throw new InvalidDataException('Measure UUID is not valid');

  next();
}

export const checkIfConfirmedValueIsValid = (req: Request, res: Response, next: NextFunction) => {
  const { confirmed_value: confirmedValue } = req.body;

  const schema = z.number();

  const result = schema.safeParse(confirmedValue);

  if (!result.success) throw new InvalidDataException('Confirmed value is not valid');

  next();
}