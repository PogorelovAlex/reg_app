import { Request, Response, Router } from 'express';

import authRouter from './apiV1.routes/auth.routes';
import userRouter from './apiV1.routes/user.routes';

const apiV1 = Router();

apiV1.use('/users', userRouter);
apiV1.use('/auth', authRouter);
apiV1.get('/', (req: Request, res: Response) => {
  res.send('Hello api v1');
});

export default apiV1;
