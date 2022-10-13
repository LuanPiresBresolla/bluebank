import { compare } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { IUser } from '../../infra/mongoose/schemas/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { sign } from 'jsonwebtoken';
import auth from '../../../../config/auth';
import { formatUser } from '../../../../utils/formatUser';

interface IRequest {
  cpf: string;
  password: string;
}

interface IResponse {
  user: Omit<IUser, 'password'>;
  token: string;
}

@injectable()
class CreateSessionUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ cpf, password }: IRequest): Promise<IResponse> {
    
    const user = await this.usersRepository.findByCpf(cpf);
    
    if (!user) {
      throw new AppError('Usuário não encontrado!');
    }
    
    const passwordIsValid = await compare(password, user.password);

    if (!passwordIsValid) {
      throw new AppError('Senha incorreta!');
    }

    const { _id, name, email } = user;

    const token = sign({ _id, name, email }, auth.secretKey, {
      subject: String(user._id),
      expiresIn: auth.expiresIn,
    });

    return { user: formatUser(user), token };
  }
}

export { CreateSessionUseCase };
