import { Router } from 'express';
import usersRouter from '@modules/students/routes/students.routes';

const routes = Router();

routes.use('/api/users', usersRouter);

export default routes;
