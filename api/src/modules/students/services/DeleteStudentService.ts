import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { StudentRepository } from '../typeorm/repositories/StudentsRepository';

interface IRequest {
  id: string;
}

class DeleteStudentService {
  public async execute({ id }: IRequest): Promise<void> {
    const studentRepository = getCustomRepository(StudentRepository);

    const user = await studentRepository.findOne(id);

    if (!user) {
      throw new AppError('User not found.');
    }

    await studentRepository.remove(user);
  }
}

export default DeleteStudentService;
