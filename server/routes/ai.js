import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/suggest', verifyToken, async (req, res) => {
  try {
    const { fieldType, context } = req.body;

    if (!fieldType || !context) {
      return res.status(400).json({ error: 'fieldType and context are required' });
    }

    // Initialize Gemini client here, inside the handler
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const prompts = {
      jobDescription: `Based on this job experience context: "${context}", generate a detailed professional job description (4-5 sentences) highlighting key responsibilities, achievements, technologies used, and measurable impact. Make it comprehensive and impactful.`,
      projectDescription: `Based on this project context: "${context}", generate a detailed professional project description (4-5 sentences) highlighting the purpose, technologies, your role, key features, and business impact. Make it comprehensive and impactful.`,
      volunteerDescription: `Based on this volunteer work context: "${context}", generate a detailed professional description (4-5 sentences) highlighting contributions, impact on community, skills developed, and measurable outcomes. Make it comprehensive and impactful.`,
      awardDescription: `Based on this award context: "${context}", generate a detailed professional description (3-4 sentences) explaining the significance, criteria met, and impact of the award. Make it comprehensive and impactful.`,
      certificationDescription: `Based on this certification context: "${context}", generate a detailed professional description (3-4 sentences) about the certification, skills acquired, relevance to your career, and how it adds value. Make it comprehensive and impactful.`,
      publicationDescription: `Based on this publication context: "${context}", generate a detailed professional description (4-5 sentences) about the publication, its significance, key findings or contributions, and impact in the field. Make it comprehensive and impactful.`,
      educationDescription: `Based on this education context: "${context}", generate a detailed professional description (3-4 sentences) highlighting academic achievements, relevant coursework, skills developed, and how it prepared you for your career. Make it comprehensive and impactful.`,
      professionalSummary: `Based on this context: "${context}", generate a compelling professional summary (4-5 sentences) that highlights key strengths, career objectives, and unique value proposition. Make it engaging, professional, and impactful for a resume.`,
    };

    const prompt = prompts[fieldType] || prompts.jobDescription;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const result = await model.generateContent(prompt);
    const suggestion = result.response.text().trim();

    res.json({ suggestion });
  } catch (error) {
    console.error('AI suggestion error:', error.message);
    console.error('Full error:', error);
    res.status(500).json({ error: 'Failed to generate suggestion', details: error.message });
  }
});

export default router;
