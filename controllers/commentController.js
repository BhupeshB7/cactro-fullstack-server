import Comment from '../models/Comment.js';
import EventLog from '../models/EventLog.js';

export const getComments = async (req, res) => {
    try {
        const { videoId } = req.params;
        const comments = await Comment.find({ videoId }).sort({ publishedAt: -1 });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addComment = async (req, res) => {
    try {
        const { videoId } = req.params;
        const { text } = req.body;

        const comment = new Comment({
            videoId,
            text,
            author: 'You',
        });

        await comment.save();
        await EventLog.create({
            action: 'COMMENT_ADDED',
            videoId,
            details: { commentId: comment._id },
        });

        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const replyToComment = async (req, res) => {
    try {
        const { videoId, commentId } = req.params;
        const { text } = req.body;

        const reply = new Comment({
            videoId,
            text,
            author: 'You',
            isReply: true,
            parentId: commentId,
        });

        await reply.save();
        await EventLog.create({
            action: 'COMMENT_REPLIED',
            videoId,
            details: { replyId: reply._id, parentId: commentId },
        });

        res.status(201).json(reply);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const comment = await Comment.findByIdAndDelete(commentId);

        await EventLog.create({
            action: 'COMMENT_DELETED',
            videoId: comment.videoId,
            details: { commentId },
        });

        res.json({ message: 'Comment deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
