import express from 'express';
import {
    getNotes,
    addOrUpdateNote,
    deleteNote
} from '../controllers/noteController.js';

const router = express.Router();

router.get('/:videoId', getNotes);
router.post('/:videoId', addOrUpdateNote);
router.delete('/:videoId', deleteNote);

export default router;
