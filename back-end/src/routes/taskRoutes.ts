import express, { Request, Response } from 'express';
import Task from '../models/Task';

const router = express.Router();

// -------------------- CREATE --------------------
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: 'TITLE_REQUIRED' });
    }

    const task = await Task.create({ title, user: req.userId });
    return res.json({ success: true, message: 'TASK_CREATED', data: task });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'TASK_CREATE_ERROR' });
  }
});

// -------------------- GET ALL --------------------
router.get('/', async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({ user: req.userId });
    return res.json({ success: true, message: 'TASKS_FETCHED', data: tasks });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'TASK_FETCH_ERROR' });
  }
});

// -------------------- UPDATE --------------------
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ success: false, message: 'TASK_NOT_FOUND' });
    }

    return res.json({ success: true, message: 'TASK_UPDATED', data: task });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'TASK_UPDATE_ERROR' });
  }
});

// -------------------- DELETE --------------------
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!task) {
      return res.status(404).json({ success: false, message: 'TASK_NOT_FOUND' });
    }

    return res.json({ success: true, message: 'TASK_DELETED' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'TASK_DELETE_ERROR' });
  }
});

export default router;

