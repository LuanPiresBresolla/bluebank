import { inject, injectable } from 'tsyringe';
import { IBalance } from '../../infra/mongoose/schemas/Balance';
import { IBalanceRepository } from '../../repositories/IBalanceRepository';

@injectable()
class FindBalancesUseCase {
  constructor(
    @inject('BalanceRepository')
    private balanceRepository: IBalanceRepository,
  ) { }

  async execute(user_id: string): Promise<IBalance[]> {
    const balances = await this.balanceRepository.findAllByUserId(user_id);

    return balances;
  }
}

export { FindBalancesUseCase };
