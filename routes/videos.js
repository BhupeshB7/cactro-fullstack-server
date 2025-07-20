import express from 'express';
import { getVideoDetails, updateVideo } from '../controllers/videoController.js';

const router = express.Router();

router.get('/:videoId', getVideoDetails);
router.put('/:videoId', updateVideo);

export default router;
