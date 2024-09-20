import express from 'express'
import { authGuardMid } from '../../middlewares/authGuard';
import { postsController } from './controller';
import { upload } from '../../middlewares/uploadMid';

const  router = express.Router();

// GET: /posts
router
  .route('')
  .get(authGuardMid, postsController.gets);

// GET: /posts/user
router
  .route('/user')
  .get(authGuardMid, postsController.getUserPosts);

router
  .route('/:id')
  .get(authGuardMid, postsController.get);

// POST: /posts
router
  .route('')
  .post(authGuardMid, upload.single('file'), postsController.create);

// POST: /posts/vote
router
  .route('/vote')
  .post(authGuardMid, postsController.vote);

export default router;