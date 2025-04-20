const mongoose = require('mongoose');

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

module.exports = mongoose.model("Homework", homeworkSchema);
