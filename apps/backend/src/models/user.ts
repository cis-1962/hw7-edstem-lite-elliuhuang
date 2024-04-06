import mongoose, { Document, Schema } from 'mongoose';

type User = {
    username: string;
    password: string;
}

type UserModel = User & Document;

const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model<UserModel>('User', UserSchema);

export default User;