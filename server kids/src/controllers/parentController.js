import jwt from 'jsonwebtoken';
import Parent from '../models/parent.js';

import Progress from '../models/Progress.js'
import {student} from '../models/student.model.js';
import { Teacher } from '../models/teacher.model.js';

const generateToken = (id) => {
  return jwt.sign({ id }, 'parentSecretKey123', { expiresIn: '30d' }); // use env variable in production
};

export const registerParent = async (req, res) => {
  try {
    console.log(req.body);
    
    const { Firstname,Lastname ,Email, Password } = req.body;

    const parentExists = await Parent.findOne({ Email });
    if (parentExists) return res.status(400).json({ error: 'Parent already exists' });

    const parent = await Parent.create({Firstname,Lastname ,Email, Password});
    res.status(201).json({
      ...parent,
      token: generateToken(parent._id)
    });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: error.message });
  }
};

export const loginParent = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    const parent = await Parent.findOne({ Email });
    if (parent && (await parent.matchPassword(Password))) {
      res.json({
        ...parent,
        token: generateToken(parent._id),
        message:"Logged in",
        role:"parent"
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



// Assign teacher to parent
export const assignTeacher = async (req, res) => {
  const { parentId } = req.params;
  const { teacherId } = req.body;

  try {
    const parent = await Parent.findById(parentId);
    const teacher = await Teacher.findById(teacherId);
    
    if (!parent) return res.status(404).json({ message: 'Parent not found' });

    parent.teacher = teacherId;
    teacher.ParentId = parentId; // Assuming you want to link the teacher back to the parent as well
    await teacher.save(); // Save the teacher document if needed
    await parent.save();

    res.status(200).json({ message: 'Teacher assigned successfully', parent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Assign students to parent
export const assignStudents = async (req, res) => {
  const { parentId } = req.params;
  const { studentIds } = req.body; // Expecting an array

  try {
    const parent = await Parent.findById(parentId);
    if (!parent) return res.status(404).json({ message: 'Parent not found' });

    parent.children = studentIds; // Replace existing list; use `.push(...ids)` to append
    await parent.save();

    res.status(200).json({ message: 'Students assigned successfully', parent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAllParents = async (req, res) => {
  try {
    const parents = await Parent.find().populate("children"); // populates student details

    if (!parents || parents.length === 0) {
      return res.status(404).json({ message: "No parents found" });
    }

    res.status(200).json({ message: "All parents fetched successfully", parents });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
