import mongoose from 'mongoose';

export interface IUser {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  cpf: string;
  password: string;
  created_at: string;
  updated_at: string;
}

const UserSchema = new mongoose.Schema<IUser>({
  name: String,
  email: { type: String, unique: true },
  cpf: { type: String, unique: true },
  password: { type: String },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

export default mongoose.model<IUser>('Users', UserSchema);