import cors from 'cors';
import express from 'express';

import unknownEndpoint from './middleware/unknown-endpoint.js';
import blogsRouter from './routes/blogs.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', blogsRouter);

app.use(unknownEndpoint);

export default app;
