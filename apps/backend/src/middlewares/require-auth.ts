import { Request, Response, NextFunction } from 'express';

const RequireAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.session || !req.session.userId) {
    const err = new Error('No active session');
    res.status(401).json({'error': 'No active session'});
    next(err);
  } else {
    next();
  }
};

export default RequireAuth;