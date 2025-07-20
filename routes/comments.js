import express from 'express';
import {
    getComments,
    addComment,
    replyToComment,
    deleteComment
} from '../controllers/commentController.js';

const router = express.Router();

router.get('/:videoId', getComments);
router.post('/:videoId', addComment);
router.post('/:videoId/reply/:commentId', replyToComment);
router.delete('/:commentId', deleteComment);

export default router;
