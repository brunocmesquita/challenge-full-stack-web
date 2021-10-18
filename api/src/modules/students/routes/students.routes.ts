import { Router } from 'express';
import StudentsController from '../controllers/StudentController';
import { celebrate, Joi, Segments } from 'celebrate';

const studentsRouter = Router();
const studentsController = new StudentsController();

studentsRouter.get('/', studentsController.index);

studentsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  studentsController.show,
);

studentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      ra_aluno: Joi.string().required(),
      name: Joi.string().required(),
      cpf: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  studentsController.create,
);

studentsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      cpf: Joi.string().required(),
      email: Joi.string().email().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  studentsController.update,
);

studentsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  studentsController.delete,
);

export default studentsRouter;
