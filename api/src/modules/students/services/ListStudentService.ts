import { getCustomRepository } from 'typeorm';
import Student from '../typeorm/entities/Student';
import { StudentRepository } from '../typeorm/repositories/StudentsRepository';

class ListStudentService {
  public async execute(): Promise<Student[]> {
    const studentsRepository = getCustomRepository(StudentRepository);

    const users = await studentsRepository.find();

    return users;
  }
}

export default ListStudentService;
