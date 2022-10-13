import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindBalancesUseCase } from './FindBalancesUseCase';

class FindBalancesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const findBalancesUseCase = container.resolve(FindBalancesUseCase);

    const balances = await findBalancesUseCase.execute(id);

    return response.json(balances);
  }
}

export { FindBalancesController };
