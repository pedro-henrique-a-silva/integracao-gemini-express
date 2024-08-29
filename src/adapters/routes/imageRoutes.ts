import express from 'express';
import getImageController from '../controller/imageController';

const imageRouter = express.Router();

imageRouter.get('/image/:id', getImageController);

export default imageRouter;