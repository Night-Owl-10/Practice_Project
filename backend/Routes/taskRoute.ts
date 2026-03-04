import express from 'express';
import { createTask, deleteTask, getAllTasks, updateTask } from '../Controller/taskController';
import { authenticateToken } from '../Middleware/authentication';

const router = express.Router();

router.post('/tasks', authenticateToken, createTask);
router.get('/tasks', authenticateToken, getAllTasks);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

export default router;