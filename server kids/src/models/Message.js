import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'fromRole'
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'toRole'
  },
  fromRole: {
    type: String,
    enum: ['teacher', 'parent'],
    required: true
  },
  toRole: {
    type: String,
    enum: ['teacher', 'parent'],
    required: true
  },
  message: {
    type: String,
    required: true
  },
  sentAt: {
    type: Date,
    default: Date.now
  }
});

const Message = mongoose.model('Message', messageSchema);
export default Message;
