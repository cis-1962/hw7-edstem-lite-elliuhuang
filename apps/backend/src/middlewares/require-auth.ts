import { Request, Response, NextFunction } from 'express';

const RequireAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.session || !req.session.userId) {
    const err = new Error('No active session');
    console.log('No active session');
    res.status(401);
    next(err);
  } else {
    next();
  }
};

export default RequireAuth;