import express from 'express';
import Task from '../models/Task';
import { Request, Response } from 'express';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    const { title } = req.body;
    const task = await Task.create({ title, user: req.userId });
    res.json(task);
});

router.get('/', async (req, res) => {
    const tasks = await Task.find({ user: req.userId});
    res.json(tasks);
});

router.put('/:id', async (req: Request, res: Response) => {
    const tasks = await Task.findOneAndUpdate(
        { _id: req.params.id, user: req.userId},
        req.body,
        { new: true}
    );
    res.json(tasks)
});

router.delete('/:id', async (req, res) => {
    await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
    res.json({ msg: 'Tafera Removida'});
});

export default router;