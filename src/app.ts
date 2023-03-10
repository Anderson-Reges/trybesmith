import express from 'express';
import { productsRouter, usersRouter, ordersRouter, loginRouter } from './routes/index';

const app = express();

app
  .use(express.json())
  .use('/login', loginRouter)
  .use('/products', productsRouter)
  .use('/users', usersRouter)
  .use('/orders', ordersRouter);

export default app;
