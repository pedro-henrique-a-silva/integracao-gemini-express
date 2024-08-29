import express from 'express';
import { 
  uploadMeasurementController, 
  confirmMeasurementController } from '../controller/measureController';
import {
  checkIfBase64ImageIsValid,
  checkIfCustomerCodeIsValid,
  checkIfMeasureDateTimeIsValid,
  checkIfMeasureTypeIsValid,
} from '../middlewares/uploadMiddleware';
import { 
  checkIfConfirmedValueIsValid, 
  checkIfMeasureUUIDIsValid } from '../middlewares/confimationMiddleware';

const measureRouter = express.Router();

measureRouter.post(
  '/upload',
  checkIfBase64ImageIsValid,
  checkIfCustomerCodeIsValid,
  checkIfMeasureDateTimeIsValid,
  checkIfMeasureTypeIsValid,
  uploadMeasurementController,
);

measureRouter.patch(
  '/confirm',
  checkIfMeasureUUIDIsValid,
  checkIfConfirmedValueIsValid,
  confirmMeasurementController);

export default measureRouter;
