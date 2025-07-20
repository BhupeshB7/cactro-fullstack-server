import Note from '../models/Note.js';
import EventLog from '../models/EventLog.js';

export const getNotes = async (req, res) => {
    try {
        const { videoId } = req.params;
        const notes = await Note.find({ videoId });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addOrUpdateNote = async (req, res) => {
    try {
        const { videoId } = req.params;
        const { note } = req.body;

        const updatedNote = await Note.findOneAndUpdate(
            { videoId },
            { note, updatedAt: new Date() },
            { upsert: true, new: true }
        );

        await EventLog.create({
            action: 'NOTE_UPDATED',
            videoId,
            details: { noteId: updatedNote._id },
        });

        res.json(updatedNote);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteNote = async (req, res) => {
    try {
        const { videoId } = req.params;
        await Note.findOneAndDelete({ videoId });

        await EventLog.create({ action: 'NOTE_DELETED', videoId });
        res.json({ message: 'Note deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
