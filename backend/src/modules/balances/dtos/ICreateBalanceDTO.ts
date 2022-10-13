import mongoose from "mongoose";

export interface ICreateBalanceDTO {
  user_id: mongoose.Schema.Types.ObjectId | string;
  value: number;
  entry: boolean;
}