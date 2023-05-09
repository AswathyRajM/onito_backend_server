import express, { Express } from 'express';
import { router as movieRouter } from './movie.routes';

const rootRouter = express.Router();

rootRouter.use('/', movieRouter);

const applyRoutes = (app: Express) => {
  app.use('/api/v1/', rootRouter);
};

export default applyRoutes;
