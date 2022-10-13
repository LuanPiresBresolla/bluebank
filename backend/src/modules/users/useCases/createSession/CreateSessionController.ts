import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSessionUseCase } from './CreateSessionUseCase';

class CreateSessionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { cpf, password } = request.body;

    const createSessionUseCase = container.resolve(CreateSessionUseCase);

    const authenticated = await createSessionUseCase.execute({
      cpf,
      password,
    });

    return response.json(authenticated);
  }
}

export { CreateSessionController };
