import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    videoId: { type: String, required: true },
    note: { type: String, required: true },
    updatedAt: { type: Date, default: Date.now },
}, {
    timestamps: true,
    strict: true,
});

const Note = mongoose.model('Note', noteSchema);
export default Note;
