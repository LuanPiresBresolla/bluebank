import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../../repositories/IUsersRepository";

import UserSchema, { IUser } from '../schemas/User';

class UserRepository implements IUsersRepository {
  async deleteById(id: string): Promise<void> {
    await UserSchema.deleteOne({ _id: id });
  }

  async findByCpf(cpf: string): Promise<IUser> {
    const user = await UserSchema.findOne({ cpf });
    return user;
  }
  
  async create(data: ICreateUserDTO): Promise<IUser> {
    try {
      const user = await UserSchema.create(data);
      return user;
    } catch (error) {
      return null;
    }
  }

  async findById(id: string): Promise<IUser> {
    const user = await UserSchema.findById(id);
    return user;
  }
}

export { UserRepository };