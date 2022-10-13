import { ICreateBalanceDTO } from "../dtos/ICreateBalanceDTO";
import { IBalance } from "../infra/mongoose/schemas/Balance";

export interface IBalanceRepository {
  create(data: ICreateBalanceDTO): Promise<IBalance>;
  findAllByUserId(id: string): Promise<IBalance[]>;
  findBalanceTotalByUserId(id: string): Promise<number>;
}