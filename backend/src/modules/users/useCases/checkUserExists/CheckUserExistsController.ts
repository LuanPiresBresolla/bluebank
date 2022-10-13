import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CheckUserExistsUseCase } from './CheckUserExistsUseCase';

class CheckUserExistsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { cpf } = request.query;

    const checkUserExistsUseCase = container.resolve(CheckUserExistsUseCase);

    const userExits = await checkUserExistsUseCase.execute(String(cpf));

    return response.json(userExits);
  }
}

export { CheckUserExistsController };
