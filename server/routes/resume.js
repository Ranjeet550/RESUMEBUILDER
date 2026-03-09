import express from 'express';
import Resume from '../models/Resume.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Create resume
router.post('/', verifyToken, async (req, res) => {
  try {
    const resume = new Resume({
      userId: req.userId,
      ...req.body
    });
    await resume.save();
    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create resume', error: error.message });
  }
});

// Get all resumes for user
router.get('/', verifyToken, async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch resumes', error: error.message });
  }
});

// Get single resume
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.userId });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch resume', error: error.message });
  }
});

// Update resume
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const resume = await Resume.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update resume', error: error.message });
  }
});

// Delete resume
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete resume', error: error.message });
  }
});

export default router;
