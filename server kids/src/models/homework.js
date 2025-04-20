import mongoose from 'mongoose';

const homeworkSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: Date,
  attachments: [String], // URLs or filenames
  assignedTo: [String], // Student IDs or roles
  submittedBy: [{
    studentId: String,
    file: String,
    submittedAt: Date,
    feedback: String,
    grade: String
  }],
  createdBy: String // Teacher ID
}, { timestamps: true });

const Homework = mongoose.model('Homework', homeworkSchema);

export default Homework;
