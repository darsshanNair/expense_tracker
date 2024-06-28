import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from './config/inversify.config';
import './controllers/user.controller';
import './controllers/expense.controller';

const server = new InversifyExpressServer(container);

const PORT = process.env.PORT || 3000;

server.build().listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
