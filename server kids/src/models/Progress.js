import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'student',
    required: true
  },
  subject: String,
  progressPercentage: Number,
  comments: String,
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const Progress = mongoose.model('Progress', progressSchema);
export default Progress;
