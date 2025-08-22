import { Request, Response } from 'express';

export const getAllUsers = (req: Request, res: Response) => {
  // Dummy data for demo
  res.json([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ]);
};
