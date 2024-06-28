import express, { Application } from 'express';
import bodyParser from 'body-parser';
import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from './config/inversify.config';
import './controllers/user.controller'; // Import controllers

const app: Application = express();

// Middleware
app.use(bodyParser.json());

// Inversify server
const server = new InversifyExpressServer(container, null, { rootPath: "/api" }, app);

const PORT = process.env.PORT || 3000;

server.build().listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
