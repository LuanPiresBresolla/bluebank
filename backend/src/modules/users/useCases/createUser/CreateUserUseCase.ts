import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import auth from '../../../../config/auth';
import { AppError } from '../../../../shared/errors/AppError';
import { formatUser } from '../../../../utils/formatUser';
import { IBalanceRepository } from '../../../balances/repositories/IBalanceRepository';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUser } from '../../infra/mongoose/schemas/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IResponse {
  user: Omit<IUser, 'password'>;
  token: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    
    @inject('BalanceRepository')
    private balanceRepository: IBalanceRepository,
  ) {}

  async execute({ name, cpf, email, password }: ICreateUserDTO): Promise<IResponse> {
    const passwordHash = await hash(password, 8);
    
    const user = await this.usersRepository.create({ name, email, cpf, password: passwordHash });

    if (!user) {
      throw new AppError('Falha ao criar usuário!');
    }

    const balance = await this.balanceRepository.create({
      user_id: user._id,
      value: 10000,
      entry: true,
    });

    if (!balance) {
      await this.usersRepository.deleteById(String(user._id));
      throw new AppError('Falha ao criar usuário!');
    }

    const { _id } = user;

    const token = sign({ _id, name, email }, auth.secretKey, {
      subject: String(user._id),
      expiresIn: auth.expiresIn,
    });

    return { user: formatUser(user), token };
  }
}

export { CreateUserUseCase };
