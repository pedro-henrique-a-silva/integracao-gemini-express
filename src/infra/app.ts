import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import routes from '../adapters/routes';
import CustomError from '../adapters/exceptions/CustomException';

const app = express();

app.use(express.json());

app.use('/upload', routes);

app.get('/', (req, res) => {
  res.status(200).send('Hello World');
});

app.use('/uploads', express.static(path.join(__dirname, '..', '..', 'tmp', 'uploads')));

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      errorCode: err.errorCode, errorDescription: err.message,
    });
  }
  return res.status(500).json({ errorCode: 'internal_server_error', message: err.message });
});

export default app;
