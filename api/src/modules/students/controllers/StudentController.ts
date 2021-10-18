import { Request, Response } from 'express';
import CreateStudentService from '../services/CreateStudentService';
import DeleteStudentService from '../services/DeleteStudentService';
import ListStudentService from '../services/ListStudentService';
import ShowStudentService from '../services/ShowStudentService';
import UpdateStudentService from '../services/UpdateStudentService';

export default class StudentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listStudents = new ListStudentService();

    const users = await listStudents.execute();

    return res.json(users);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showStudent = new ShowStudentService();

    const user = await showStudent.execute({ id });

    return res.json(user);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { ra_aluno, name, cpf, email } = req.body;

    const createStudent = new CreateStudentService();

    const user = await createStudent.execute({
      ra_aluno,
      name,
      cpf,
      email,
    });

    return res.json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, cpf, email } = req.body;
    const { id } = req.params;

    const updateStudent = new UpdateStudentService();

    const user = await updateStudent.execute({
      id,
      name,
      cpf,
      email,
    });

    return res.json(user);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteStudent = new DeleteStudentService();

    await deleteStudent.execute({ id });

    return res.json([]);
  }
}
