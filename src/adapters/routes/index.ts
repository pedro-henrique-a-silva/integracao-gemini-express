import express from 'express';
import measureRouter from './measureRoutes';
import imageRouter from './imageRoutes';

const rootRouter = express.Router();

rootRouter.use(measureRouter);
rootRouter.use(imageRouter);

export default rootRouter;
