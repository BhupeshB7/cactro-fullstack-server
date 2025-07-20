import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    videoId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: String,
    channelTitle: String,
    views: Number,
    publishedAt: Date,
  },
  {
    timestamps: true,
    strict: true,
  }
);

const Video = mongoose.model("Video", videoSchema);
export default Video;
