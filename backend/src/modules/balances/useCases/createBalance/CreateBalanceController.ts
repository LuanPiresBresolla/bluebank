import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateBalanceUseCase } from './CreateBalanceUseCase';

class CreateBalanceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { entry, value } = request.body;
    const { id } = request.user;

    const createBalanceUseCase = container.resolve(CreateBalanceUseCase);

    const balance = await createBalanceUseCase.execute({ entry, value, user_id: id });

    return response.json(balance);
  }
}

export { CreateBalanceController };
