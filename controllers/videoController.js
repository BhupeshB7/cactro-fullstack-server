import axios from "axios";
import Video from "../models/Video.js";
import EventLog from "../models/EventLog.js";
import dotenv from "dotenv";
dotenv.config();

export const getVideoDetails = async (req, res, next) => {
  try {
    let { videoId } = req.params;

    if (videoId.length !== 11) {
      return res.status(400).json({ error: "Invalid video ID." });
    }

    const API_KEY = process.env.YOUTUBE_API_KEY;
    if (!API_KEY) {
      const err = new Error("Missing YouTube API Key in environment.");
      err.statusCode = 500;
      throw err;
    }

    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          part: "snippet,statistics",
          id: videoId,
          key: API_KEY,
        },
      }
    );

    if (response.data.items.length === 0) {
      const err = new Error("Video not found on YouTube.");
      err.statusCode = 404;
      throw err;
    }

    const videoData = response.data.items[0];
    const video = {
      videoId,
      title: videoData.snippet.title,
      description: videoData.snippet.description,
      channelTitle: videoData.snippet.channelTitle,
      views: parseInt(videoData.statistics.viewCount),
      publishedAt: new Date(videoData.snippet.publishedAt),
    };

    await Video.findOneAndUpdate({ videoId }, video, { upsert: true });
    await EventLog.create({
      action: "VIDEO_FETCHED",
      videoId,
      details: { title: video.title },
    });

    res.json(video);
  } catch (error) {
    console.log(error)
    next(error);
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const { videoId } = req.params;
    const { title, description } = req.body;

    const video = await Video.findOneAndUpdate(
      { videoId },
      { title, description },
      { new: true }
    );

    if (!video) {
      const err = new Error("Video not found in database.");
      err.statusCode = 404;
      throw err;
    }

    await EventLog.create({
      action: "VIDEO_UPDATED",
      videoId,
      details: { title, description },
    });

    res.json(video);
  } catch (error) {
    next(error);
  }
};
