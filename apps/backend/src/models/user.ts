import mongoose, { Document, Schema, Model } from 'mongoose';

type User = {
    username: string;
    password: string;
}

type UserType = User & Document;

const UserSchema: Schema<UserType> = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const UserModel: Model<UserType> = mongoose.model<UserType>('User', UserSchema);

export default UserModel;
