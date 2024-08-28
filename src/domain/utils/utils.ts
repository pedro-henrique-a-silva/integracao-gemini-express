import Jimp from 'jimp';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import InvalidDataException from '../../adapters/exceptions/InvalidDataException';

export const checkIfImageBase64IsValid = async (image: string): Promise<void> => {
  const buf = Buffer.from(image, 'base64');

  try {
    await Jimp.read(buf);
  } catch (_err) {
    throw new InvalidDataException('Image is not valid');
  }
};

export const saveImageBase64IntoFile = async (image: string): Promise<void> => {
  const buf = Buffer.from(image, 'base64');

  try {
    const imageData = await Jimp.read(buf);

    const imageId = uuidv4();
    const imagePath = path.join(__dirname, '../../infra', 'uploads', `${imageId}.png`);

    imageData.write(imagePath);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log('Erro ao savar, iamge', err.message);
    }
  }
};
