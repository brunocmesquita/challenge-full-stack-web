import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Student from '../typeorm/entities/Student';
import { StudentRepository } from '../typeorm/repositories/StudentsRepository';
import { cpf as valitateCpf } from 'cpf-cnpj-validator';

interface IRequest {
  ra_aluno: string;
  name: string;
  cpf: string;
  email: string;
}

class CreateStudentService {
  public async execute({
    ra_aluno,
    name,
    cpf,
    email,
  }: IRequest): Promise<Student> {
    const studentRepository = getCustomRepository(StudentRepository);

    const userExists = await studentRepository.findByRA(ra_aluno);
    if (userExists) {
      throw new AppError('There is already an user with this RA.');
    }

    const user = studentRepository.create({
      ra_aluno,
      name,
      cpf,
      email,
    });

    const validCpf = valitateCpf.isValid(user.cpf);
    if (!validCpf) {
      throw new AppError('CPF needs to be valid');
    }

    await studentRepository.save(user);

    return user;
  }
}

export default CreateStudentService;
