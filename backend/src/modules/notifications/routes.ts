import express from 'express'
import { upload } from '../../middlewares/uploadMid';
import { authGuardMid } from '../../middlewares/authGuard';
import { notificationsController } from './controller';

const  router = express.Router();

// GET: /notifications
router
  .route('')
  .get(authGuardMid, notificationsController.gets);

router
  .route('/read')
  .put(authGuardMid, notificationsController.read);

export default router;