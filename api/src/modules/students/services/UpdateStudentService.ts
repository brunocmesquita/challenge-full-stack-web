import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Student from '../typeorm/entities/Student';
import { StudentRepository } from '../typeorm/repositories/StudentsRepository';
import { cpf as valitateCpf } from 'cpf-cnpj-validator';

interface IRequest {
  id: string;
  name: string;
  cpf: string;
  email: string;
}

class UpdateStudentService {
  public async execute({ id, name, cpf, email }: IRequest): Promise<Student> {
    const studentsRepository = getCustomRepository(StudentRepository);

    const user = await studentsRepository.findOne(id);

    if (!user) {
      throw new AppError('User not found.');
    }

    user.name = name;
    user.cpf = cpf;
    user.email = email;

    const validCpf = valitateCpf.isValid(user.cpf);
    if (!validCpf) {
      throw new AppError('CPF needs to be valid');
    }

    await studentsRepository.save(user);

    return user;
  }
}

export default UpdateStudentService;
