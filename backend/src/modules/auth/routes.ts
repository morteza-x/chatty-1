import express from 'express'
import { authController } from './controller';
import { authGuardMid } from '../../middlewares/authGuard';

const  router = express.Router();

// POST: /auth/register
router
  .route('/register')
  .post(authController.register);

// POST: /auth/login
router
  .route('/login')
  .post(authController.login);

// POST: /auth/get
router
  .route('/get')
  .get(authGuardMid, authController.getAuth);

// POST: /auth/get
router
  .route('/logout')
  .get(authGuardMid, authController.logout);

export default router;