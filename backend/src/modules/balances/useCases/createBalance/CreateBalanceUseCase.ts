import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { ICreateBalanceDTO } from '../../dtos/ICreateBalanceDTO';
import { IBalance } from '../../infra/mongoose/schemas/Balance';
import { IBalanceRepository } from '../../repositories/IBalanceRepository';

interface IResponse {
  balance: IBalance;
  balanceTotal: number;
}

@injectable()
class CreateBalanceUseCase {
  constructor(
    @inject('BalanceRepository')
    private balanceRepository: IBalanceRepository,
  ) { }

  async execute({ user_id, entry, value }: ICreateBalanceDTO): Promise<IResponse> {
    let balanceCount = 0;
    let hundred = 0;
    let fifty = 0;
    let twenty = 0;
    let ten = 0;
    
    while (balanceCount < value && ((value - balanceCount) >= 100)) {
      balanceCount += 100;
      hundred++;
    }
    
    while (balanceCount < value && ((value - balanceCount) >= 50)) {
      balanceCount += 50;
      fifty++;
    }
    
    while (balanceCount < value && ((value - balanceCount) >= 20)) {
      balanceCount += 20;
      twenty++;
    }
    
    while (balanceCount < value && ((value - balanceCount) >= 10)) {
      balanceCount += 10;
      ten++;
    }

    if (balanceCount !== value) {
      throw new AppError('Valor do saque inválido para cédulas disponíveis!');
    }
    
    let balanceTotal = await this.balanceRepository.findBalanceTotalByUserId(String(user_id));

    if (!entry && value > balanceTotal) {
      throw new AppError('Valor do saque maior que o saldo disponível em conta!');
    }

    const balance = await this.balanceRepository.create({
      entry,
      user_id,
      value: !entry ? value * -1 : value,
    });

    if (!balance) {
      throw new AppError('Falha ao registrar transação!');
    }

    balanceTotal = await this.balanceRepository.findBalanceTotalByUserId(String(user_id));

    return { balance, balanceTotal };
  }
}

export { CreateBalanceUseCase };
