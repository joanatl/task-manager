import mongoose, {Document, Schema} from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    email: string;
    password: string;
    comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true},
    password: {type: String, required:true}
});

userSchema.pre('save', async function (next){
    if (!this.isModified('password')) return next();
    const hashed = await bcrypt.hash(this.password,10);
    this.password = hashed;
    next();
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean>{
    return bcrypt.compare(password, this.password);
};

export default mongoose.model<IUser>('User', userSchema);
