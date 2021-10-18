import { getCustomRepository } from 'typeorm';
import Student from '../typeorm/entities/Student';
import { StudentRepository } from '../typeorm/repositories/StudentsRepository';

interface IPaginateStudent {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: Student[];
}
class ListStudentService {
  public async execute(): Promise<IPaginateStudent> {
    const studentsRepository = getCustomRepository(StudentRepository);

    const users = await studentsRepository.createQueryBuilder().paginate();

    return users as IPaginateStudent;
  }
}

export default ListStudentService;
