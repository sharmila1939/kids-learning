import express from 'express';
import { sendMessage, getMessages } from '../controllers/messageController.js';

const router = express.Router();

router.post('/send', sendMessage);
router.get('/history', getMessages); // ?from=xxx&to=yyy

export default router;
