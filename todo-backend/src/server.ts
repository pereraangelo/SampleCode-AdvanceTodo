import express from 'express';
import taskRoutes from './routes/TaskRoutes';

const app = express();
app.use(express.json());

app.use('/api', taskRoutes);

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
