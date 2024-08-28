import express from 'express';
import measureController from '../controller/measureController';
import { checkIfBase64ImageIsValid } from '../middlewares/uploadMiddleware';

const measureRouter = express.Router();

measureRouter.post('/', checkIfBase64ImageIsValid, measureController);

export default measureRouter;
