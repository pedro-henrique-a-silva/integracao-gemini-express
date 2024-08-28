import express from 'express';
import measureController from '../controller/measureController';
import {
  checkIfBase64ImageIsValid,
  checkIfCustomerCodeIsValid,
  checkIfMeasureDateTimeIsValid,
  checkIfMeasureTypeIsValid,
} from '../middlewares/uploadMiddleware';

const measureRouter = express.Router();

measureRouter.post(
  '/',
  checkIfBase64ImageIsValid,
  checkIfCustomerCodeIsValid,
  checkIfMeasureDateTimeIsValid,
  checkIfMeasureTypeIsValid,
  measureController,
);

export default measureRouter;
