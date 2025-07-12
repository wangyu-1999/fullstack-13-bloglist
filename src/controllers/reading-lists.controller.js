import { ReadingList } from '../models/index.js';

export const createReadingList = async (req, res) => {
  const { userId, blogId } = req.body;

  const readingList = await ReadingList.create({
    userId,
    blogId,
  });

  res.status(201).json(readingList);
};
