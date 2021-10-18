import { EntityRepository, Repository } from 'typeorm';
import Student from '../entities/Student';

@EntityRepository(Student)
export class StudentRepository extends Repository<Student> {
  public async findByName(name: string): Promise<Student | undefined> {
    const user = this.findOne({
      where: {
        name,
      },
    });

    return user;
  }

  public async findByRA(ra_aluno: string): Promise<Student | undefined> {
    const user = this.findOne({
      where: {
        ra_aluno,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<Student | undefined> {
    const user = this.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  public async findByCpf(cpf: string): Promise<Student | undefined> {
    const user = this.findOne({
      where: {
        cpf,
      },
    });

    return user;
  }
}
