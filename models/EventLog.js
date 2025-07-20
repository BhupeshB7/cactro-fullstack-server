import mongoose from 'mongoose';

const eventLogSchema = new mongoose.Schema({
    action: { type: String, required: true },
    videoId: String,
    details: mongoose.Schema.Types.Mixed,
    timestamp: { type: Date, default: Date.now },
}, {
    timestamps: true,
    strict: true,
});

const EventLog = mongoose.model('EventLog', eventLogSchema);
export default EventLog;
