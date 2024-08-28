import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import routes from '../adapters/routes';
import CustomError from '../adapters/exceptions/CustomException';

const app = express();

app.use(express.json());

app.use('/upload', routes);

app.get('/', (req, res) => {
  res.status(200).send('Hello World');
});

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ errorCode: err.errorCode, message: err.message });
  }
  return res.status(500).json({ errorCode: 'internal_server_error', message: err.message });
});

export default app;
