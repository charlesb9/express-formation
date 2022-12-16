import { Router } from 'express';
import { routerAuth } from '../user/user.router.js';
import { routerPost } from '../post/post.router.js';

const router = Router();

router.use('/post', routerPost);
router.use('/auth', routerAuth);

export { router as routerApi };
