import express from 'express';
import { addProgress, getStudentProgress } from '../controllers/progressController.js';

const router = express.Router();

router.post('/add', addProgress);
router.get('/student/:studentId', getStudentProgress);

export default router;
