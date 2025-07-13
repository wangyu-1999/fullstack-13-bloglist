import cors from 'cors';
import express from 'express';

import postgresErrorHandler from './middleware/postgres-error-handler.js';
import unknownEndpoint from './middleware/unknown-endpoint.js';
import authorsRouter from './routes/authors.routes.js';
import blogsRouter from './routes/blogs.routes.js';
import loginRouter from './routes/login.routes.js';
import readingListsRouter from './routes/reading-lists.routes.js';
import usersRouter from './routes/users.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api', loginRouter);
app.use('/api/authors', authorsRouter);
app.use('/api/readinglists', readingListsRouter);

app.use(unknownEndpoint);
app.use(postgresErrorHandler);

export default app;
