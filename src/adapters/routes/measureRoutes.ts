import express from 'express';
import { 
  uploadMeasurementController, 
  confirmMeasurementController, 
  listMeasurentsController} from '../controller/measureController';
import {
  checkIfBase64ImageIsValid,
  checkIfCustomerCodeIsValid,
  checkIfMeasureDateTimeIsValid,
  checkIfMeasureTypeIsValid,
} from '../middlewares/uploadMiddleware';
import { 
  checkIfConfirmedValueIsValid, 
  checkIfMeasureUUIDIsValid } from '../middlewares/confimationMiddleware';
import { 
  checkIfMeasureTypeQueryParamIsValid, 
  checkIfMeasureUUIDUrlParamIsValid } from '../middlewares/listMeasurementsMiddleware';

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
  confirmMeasurementController
);

measureRouter.get(
  '/:customerId/list',
  checkIfMeasureUUIDUrlParamIsValid,
  checkIfMeasureTypeQueryParamIsValid,
  listMeasurentsController)

export default measureRouter;
