import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { checkIfImageBase64IsValid } from '../../domain/imagesDomain';
import InvalidDataException from '../exceptions/InvalidDataException';

export const checkIfBase64ImageIsValid = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { image } = req.body;
  const scheme = z.string().base64();

  const result = scheme.safeParse(image);

  if (!result.success) throw new InvalidDataException('Image is not valid');

  await checkIfImageBase64IsValid(image);

  next();
};

export const checkIfCustomerCodeIsValid = (req: Request, res: Response, next: NextFunction) => {
  const { customer_code: customerCode } = req.body;

  const schema = z.string().uuid();

  const result = schema.safeParse(customerCode);

  if (!result.success) throw new InvalidDataException('Customer code is not valid');

  next();
};

export const checkIfMeasureDateTimeIsValid = (req: Request, res: Response, next: NextFunction) => {
  const { measure_datetime: measureDatetime } = req.body;

  const schema = z.string().datetime();

  const result = schema.safeParse(measureDatetime);

  if (!result.success) throw new InvalidDataException('Measure datetime is not valid');

  next();
};

export const checkIfMeasureTypeIsValid = (req: Request, res: Response, next: NextFunction) => {
  const { measure_type: measureType } = req.body;
  const availableMeasureType = ['WATER', 'GAS'] as const;

  const schema = z.enum(availableMeasureType);

  const result = schema.safeParse(measureType);

  if (!result.success) throw new InvalidDataException('Measure type is not valid');

  next();
};
