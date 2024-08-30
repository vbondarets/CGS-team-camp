import bodyParser from 'body-parser';
import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import AppRouter from './routes/index';
import connectDB from './config/database';
import errorHandler from './middlewares/ErrorHandler';
import { JWTStrategy } from './utils/strategies/passport';

const app = express();
const router = new AppRouter(app);

// Connect to PostgreSQL
connectDB();

// Express configuration
app.set('port', process.env.PORT || 4200);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: true, credentials: true }));
router.init();
const port = app.get('port');
app.use(JWTStrategy);
app.use(errorHandler);

// eslint-disable-next-line no-console
const server = app.listen(port, () => console.log(`Server started on port ${port}`));

export { server };
