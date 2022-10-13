import { inject, injectable } from 'tsyringe';
import { IBalanceRepository } from '../../repositories/IBalanceRepository';

interface IResponse {
  balanceTotal: number;
}

@injectable()
class FindBalanceTotalUseCase {
  constructor(
    @inject('BalanceRepository')
    private balanceRepository: IBalanceRepository,
  ) { }

  async execute(user_id: string): Promise<IResponse> {
    const balanceTotal = await this.balanceRepository.findBalanceTotalByUserId(String(user_id));

    return { balanceTotal };
  }
}

export { FindBalanceTotalUseCase };
