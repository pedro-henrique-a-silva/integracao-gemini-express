import { Request, Response } from 'express';
import { processMeasurementConfirmation, processMeasurementUpload } from '../../domain/measuresDomain';
import statusCode from '../statusCode';

export const uploadMeasurementController = async (req: Request, res: Response) => {
  const {
    image,
    customer_code: customerCode,
    measure_datetime: measureDatetime,
    measure_type: measureType,
  } = req.body;

  const result = await processMeasurementUpload({
    image, customerCode, measureDatetime, measureType,
  });

  return res.status(statusCode[result.status]).json(result.data);
};

export const confirmMeasurementController = async (req: Request, res: Response) => {
  const { measure_uuid, confirmed_value } = req.body;

  const result = await processMeasurementConfirmation(measure_uuid, confirmed_value);

  return res.status(statusCode[result.status]).json(result.data);
}

