import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const parentSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'student'
  }]
}, { timestamps: true });

// Password hashing
parentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
parentSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Parent = mongoose.model('parent', parentSchema);
export default Parent;
