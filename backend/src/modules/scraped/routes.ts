import express from 'express'
import { scrapedController } from './controller';
import { authGuardMid } from '../../middlewares/authGuard';

const  router = express.Router();

// GET: /posts
router
  .route('')
  .get(scrapedController.gets);

router
  .route('/history')
  .post(scrapedController.getCryptoHistory);

router
  .route('/bookmarks')
  .get(authGuardMid, scrapedController.getMarks);

router
  .route('/bookmarks')
  .post(authGuardMid, scrapedController.create);

router
  .route('/bookmarks/:itemId')
  .delete(authGuardMid, scrapedController.delete);


export default router;