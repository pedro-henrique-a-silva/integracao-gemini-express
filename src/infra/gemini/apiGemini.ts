import { GoogleGenerativeAI } from '@google/generative-ai';
import path from 'path';
import fs from 'fs';

const geminiAPIKey = process.env.GEMINI_API_KEY || '';

const fileToGenerativePart = (filePath: string, mimeType: string) => ({
  inlineData: {
    data: Buffer.from(fs.readFileSync(filePath)).toString('base64'),
    mimeType,
  },
});

const getMeasureFromGemini = async (filePath: string, mimeType: string): Promise<number> => {
  const genAI = new GoogleGenerativeAI(geminiAPIKey);

  const imagePath = path.join(__dirname, '..', '..', '..', 'tmp', 'uploads', filePath);

  const filePart = fileToGenerativePart(imagePath, mimeType);

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `
        Please analyze the provided image of a meter and extract the current reading 
        displayed on the dial or digital interface. Ensure that you accurately identify 
        the numbers or digits shown and return the exact reading, regardless of any 
        reflections, shadows, or minor obstructions in the image. Return only the reading.`;

  const imageParts = [filePart];

  const generatedContent = await model.generateContent([prompt, ...imageParts]);

  console.log(generatedContent.response.text());

  return Number(generatedContent.response.text());
};

export default getMeasureFromGemini;
