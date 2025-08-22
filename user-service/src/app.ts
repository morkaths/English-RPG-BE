import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import passport from 'passport';

import routes from './routes';
import { FRONTEND_URL } from './utils/constants';

const app = express();

app.use(
	cors({
		credentials: true,
		origin: FRONTEND_URL || 'http://localhost:3000',
	})
);

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(
	helmet({
		crossOriginResourcePolicy: false,
	})
);
app.use(passport.initialize());

// Routes init
app.use('/api', routes);

// Health check endpoint
app.get('/healthcheck', (req, res) => {
	res.status(200).send('OK');
});

export default app;