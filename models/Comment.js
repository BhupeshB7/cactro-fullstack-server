import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    videoId: { type: String, required: true },
    commentId: String,
    text: { type: String, required: true },
    author: { type: String, default: 'You' },
    publishedAt: { type: Date, default: Date.now },
    isReply: { type: Boolean, default: false },
    parentId: String,
}, {
    timestamps: true,
    strict: true,
});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
