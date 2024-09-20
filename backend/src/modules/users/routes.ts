import express from 'express'
import { usersController } from './controller';
import { upload } from '../../middlewares/uploadMid';
import { authGuardMid } from '../../middlewares/authGuard';

const  router = express.Router();

router
  .route('')
  .put(authGuardMid, upload.single('file'), usersController.update);

export default router;