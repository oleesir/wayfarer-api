import express from 'express';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => res.status(200).json({ message: 'Welcome to Wayfarer app' }));


app.get('*', (req, res) => res.status(404).send({
  status: 404,
  error: 'Not found'
}));

const port = process.env.PORT || 3000;

app.listen(port);

export default app;
