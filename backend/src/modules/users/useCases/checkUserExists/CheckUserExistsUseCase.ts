import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IResponse {
  user: boolean;
}

@injectable()
class CheckUserExistsUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(cpf: string): Promise<IResponse> {
    
    const user = await this.usersRepository.findByCpf(cpf);

    return { user: !!user };
  }
}

export { CheckUserExistsUseCase };
