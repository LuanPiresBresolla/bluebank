import { IUser } from "../modules/users/infra/mongoose/schemas/User";

export function formatUser(user: IUser) {
  return {
    _id: user._id,
    cpf: user.cpf,
    email: user.email,
    name: user.name,
    created_at: user.created_at,
    updated_at: user.updated_at,
  }
}