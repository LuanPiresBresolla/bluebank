import { container } from "tsyringe";

import { BalanceRepository } from "../../modules/balances/infra/mongoose/repositories/BalanceRepository";
import { IBalanceRepository } from "../../modules/balances/repositories/IBalanceRepository";

import { UserRepository } from "../../modules/users/infra/mongoose/repositories/UserRepository";
import { IUsersRepository } from "../../modules/users/repositories/IUsersRepository";

container.registerSingleton<IUsersRepository>('UsersRepository', UserRepository);

container.registerSingleton<IBalanceRepository>('BalanceRepository', BalanceRepository);