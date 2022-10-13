import mongoose from "mongoose";
import { AppError } from "../../../../../shared/errors/AppError";
import { IBalanceTotalDTO } from "../../../dtos/IBalanceTotalDTO";
import { ICreateBalanceDTO } from "../../../dtos/ICreateBalanceDTO";
import { IBalanceRepository } from "../../../repositories/IBalanceRepository";

import BalancesSchema, { IBalance } from '../schemas/Balance';

class BalanceRepository implements IBalanceRepository {
  async create(data: ICreateBalanceDTO): Promise<IBalance> {
    try {
      const balance = await BalancesSchema.create(data);
      return balance;
    } catch (error) {
      return null;
    }
  }

  async findAllByUserId(id: string): Promise<IBalance[]> {
    const balances = await BalancesSchema.find({ user_id: id });
    return balances;
  }

  async findBalanceTotalByUserId(id: string): Promise<number> {    
    const mongooseId = new mongoose.Types.ObjectId(id);

    const balances = await BalancesSchema.aggregate([      
      { $match: { 'user_id': { $eq: mongooseId } } },
      {
        $group: {
          _id: '$user_id',
          total: {
            $sum: '$value'
          },
        }
      },      
    ]).exec();

    return balances[0]?.total;
  }
}

export { BalanceRepository };