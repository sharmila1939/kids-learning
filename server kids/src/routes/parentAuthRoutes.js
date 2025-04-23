import express from 'express';
import { registerParent, loginParent, getDashboard, assignTeacher, assignStudents, getAllParents } from '../controllers/parentController.js';


const router = express.Router();

router.post('/signup', registerParent);

router.post('/login', loginParent);

router.get('/:studentId', getDashboard);
// PUT /api/parents/:parentId/assign-teacher
router.put('/:parentId/assign-teacher', assignTeacher);

// PUT /api/parents/:parentId/assign-students
router.put('/:parentId/assign-students', assignStudents);
router.get('/', getAllParents);



export default router;
