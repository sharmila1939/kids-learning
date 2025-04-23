import jwt from 'jsonwebtoken';
import Parent from '../models/parent.js';
import student from '../models/student.model.js';
import Progress from '../models/Progress.js'

const generateToken = (id) => {
  return jwt.sign({ id }, 'parentSecretKey123', { expiresIn: '30d' }); // use env variable in production
};

export const registerParent = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const parentExists = await Parent.findOne({ email });
    if (parentExists) return res.status(400).json({ error: 'Parent already exists' });

    const parent = await Parent.create({ name, email, password });
    res.status(201).json({
      _id: parent._id,
      name: parent.name,
      email: parent.email,
      token: generateToken(parent._id)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginParent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const parent = await Parent.findOne({ email });
    if (parent && (await parent.matchPassword(password))) {
      res.json({
        _id: parent._id,
        name: parent.name,
        email: parent.email,
        token: generateToken(parent._id)
      });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

;

export const getDashboard = async (req, res) => {
  try {
    const { studentId } = req.params;

    const studentInfo = await student.findById(studentId).populate("Studentdetails");
    const progress = await Progress.find({ studentId });

    res.json({
      studentInfo,
      progress
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

