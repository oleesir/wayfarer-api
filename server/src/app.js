import express from 'express';
import routes from './routes';
import ErrorHandler from './middlewares/errorHandler';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', routes);

app.get('/', (req, res) => res.status(200).json({ message: 'Welcome to Wayfarer app' }));

app.use(ErrorHandler.sendError);

app.get('*', (req, res) => res.status(404).send({
  status: 404,
  error: 'Not found'
}));

const port = process.env.PORT || 3000;

app.listen(port);

export default app;
