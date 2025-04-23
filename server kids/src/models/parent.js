import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const parentSchema = new mongoose.Schema({
  Firstname: String,
  Lastname: String,
  Email: {
    type: String,
    required: true,
    unique: true
  },
  Password: {
    type: String,
    required: true
  },
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'student'
  }],
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'teacher'
  },
  
}, { timestamps: true });

// Password hashing
parentSchema.pre('save', async function (next) {
  if (!this.isModified('Password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.Password = await bcrypt.hash(this.Password, salt);
  next();
});

// Compare password method
parentSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.Password);
};

const Parent = mongoose.model('parent', parentSchema);
export default Parent;
