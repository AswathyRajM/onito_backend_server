import express from 'express';
var path = require('path');
import applyRoutes from './routes';
require('dotenv').config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const allowedMethods = ['GET', 'POST', 'PUT', 'PATCH'];
app.use((req, res, next) => {
  if (!allowedMethods.includes(req.method))
    return res.status(405).send('Method Not Allowed');
  return next();
});

applyRoutes(app);

export { app };
