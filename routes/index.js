import express from 'express';
import videoRoutes from './videos.js';
import commentRoutes from './comments.js';
import noteRoutes from './notes.js';
const router = express.Router();

router.use('/videos',videoRoutes  );
router.use('/comments',commentRoutes );
router.use('/notes',noteRoutes  );

export default router;