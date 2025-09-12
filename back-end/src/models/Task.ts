import mongoose, { Document, Schema} from 'mongoose';

export interface ITask extends Document {
    title: string;
    completed: boolean;
    user: mongoose.Types.ObjectId;
}

const taskSchema = new Schema<ITask>(
    {
        title: { type: String, required: true },
        completed: { type: Boolean, default: false },
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true}
    },
    { timestamps: true }
);

export default mongoose.model<ITask>('Task', taskSchema);