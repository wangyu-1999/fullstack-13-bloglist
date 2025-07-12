import { NotFoundError } from '../custom-errors/index.js';
import { ReadingList } from '../models/index.js';

export const createReadingList = async (req, res) => {
  const { userId, blogId } = req.body;

  const readingList = await ReadingList.create({
    userId,
    blogId,
  });

  res.status(201).json(readingList);
};

export const readReadingList = async (req, res) => {
  const readingList = await ReadingList.findByPk(req.params.id);
  if (!readingList) throw new NotFoundError('Reading list not found');
  if (req.decodedToken.id !== readingList.userId) {
    return res
      .status(403)
      .json({ error: 'You do not have permission to read this reading list' });
  } else {
    readingList.read = true;
    await readingList.save();
  }
  res.status(200).json(readingList);
};
