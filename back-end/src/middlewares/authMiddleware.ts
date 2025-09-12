import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwPayload {
    id: string;
}

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) return res.status(401).json({ msg: 'Token não fornecido'});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwPayload;
        req.userId = decoded.id;
        next();
    }   catch (err) {
        return res.status(401).json({ msg: 'Token inválido'});
    }
};

export default authMiddleware;