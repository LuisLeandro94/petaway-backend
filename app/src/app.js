import express from 'express';
import {AuthRoute} from '~v1/routes/index.js';

const app = express();
app.get('/', (req, res) => {
  res.status(200).send();
});

app.use('/v1', AuthRoute);

app.use((err, req, res, next) => {
  const { name, message, stack } = err;
  if (name === 'validationError') res.status(400).json({ error: message });
  else res.status(500).json({ name, message, stack });
  next(err);
});

export default app;
