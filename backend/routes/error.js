import express from 'express';
const errorRouter = express.Router();

errorRouter.use((req, res, next) => {
  res.status(404).json({ message: 'Route Not Found' });
});
errorRouter.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});
export default errorRouter;