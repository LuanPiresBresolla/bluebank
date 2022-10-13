import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUser } from "../infra/mongoose/schemas/User";

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<IUser>;
  findById(id: string): Promise<IUser>;
  findByCpf(cpf: string): Promise<IUser>;
  deleteById(id: string): Promise<void>;
}