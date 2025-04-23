import express from 'express';
import { registerParent, loginParent, getDashboard } from '../controllers/parentController.js';


const router = express.Router();

router.post('/register', registerParent);
router.post('/login', loginParent);

router.get('/:studentId', getDashboard);

export default router;
