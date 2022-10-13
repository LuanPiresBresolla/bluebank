import mongoose from 'mongoose';
import { randomUUID } from 'crypto';

export interface IBalance {
  _id: mongoose.Schema.Types.ObjectId;
  user_id: mongoose.Schema.Types.ObjectId;
  transaction_id: string;
  value: number;
  entry: boolean;
  created_at: string;
  updated_at: string;
}

const BalanceSchema = new mongoose.Schema<IBalance>({
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  transaction_id: { type: String, default: randomUUID },
  value: Number,
  entry: Boolean,
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

export default mongoose.model<IBalance>('Balances', BalanceSchema);