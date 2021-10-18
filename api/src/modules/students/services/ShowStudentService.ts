import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Student from '../typeorm/entities/Student';
import { StudentRepository } from '../typeorm/repositories/StudentsRepository';

interface IRequest {
  id: string;
}

class ShowStudentService {
  public async execute({ id }: IRequest): Promise<Student> {
    const studentRepository = getCustomRepository(StudentRepository);

    const user = await studentRepository.findOne(id);

    if (!user) {
      throw new AppError('User not found.');
    }

    return user;
  }
}

export default ShowStudentService;
