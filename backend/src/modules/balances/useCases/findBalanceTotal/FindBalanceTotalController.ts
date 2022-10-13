import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindBalanceTotalUseCase } from './FindBalanceTotalUseCase';

class FindBalanceTotalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const findBalanceTotalUseCase = container.resolve(FindBalanceTotalUseCase);

    const balance = await findBalanceTotalUseCase.execute(id);

    return response.json(balance);
  }
}

export { FindBalanceTotalController };
