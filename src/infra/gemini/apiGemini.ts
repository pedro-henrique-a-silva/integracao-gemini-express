import { GoogleGenerativeAI } from '@google/generative-ai';
import path from 'path';
import fs from 'fs';

const geminiAPIKey = process.env.GEMINI_API_KEY || '';

export const fileToGenerativePart = (imageBase64Format: string, mimeType: string) => ({
  inlineData: {
    data: imageBase64Format,
    mimeType,
  },
});

export const getMeasureFromGemini = async (imageBase64Format: string, mimeType: string): Promise<number> => {
  const genAI = new GoogleGenerativeAI(geminiAPIKey);

  const filePart = fileToGenerativePart(imageBase64Format, mimeType);

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `
        Please analyze the provided image of a meter and extract the current reading 
        displayed on the dial or digital interface. Ensure that you accurately identify 
        the numbers or digits shown and return the exact reading, regardless of any 
        reflections, shadows, or minor obstructions in the image. Return only the reading.`;

  const imageParts = [filePart];

  const generatedContent = await model.generateContent([prompt, ...imageParts]);

  return Number(generatedContent.response.text());
};
