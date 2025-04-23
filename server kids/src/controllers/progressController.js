import Progress from '../models/Progress.js';

export const addProgress = async (req, res) => {
  try {
    const progress = await Progress.create(req.body);
    res.status(201).json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStudentProgress = async (req, res) => {
  try {
    const { studentId } = req.params;
    const progress = await Progress.find({ studentId });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
