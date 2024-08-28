import express from 'express';
import measureRouter from './measureRoutes';

const rootRouter = express.Router();

rootRouter.use(measureRouter);

export default rootRouter;
