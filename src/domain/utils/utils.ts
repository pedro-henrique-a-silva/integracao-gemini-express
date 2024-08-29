import Jimp from 'jimp';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import InvalidDataException from '../../adapters/exceptions/InvalidDataException';
import { SavedImageInfo } from '../../application/interface/Measure';

export const checkIfImageBase64IsValid = async (image: string): Promise<void> => {
  const buf = Buffer.from(image, 'base64');

  try {
    await Jimp.read(buf);
  } catch (_err) {
    throw new InvalidDataException('Image is not valid');
  }
};

export const saveImageBase64IntoFile = async (
  image: string,
): Promise<SavedImageInfo | undefined> => {
  const buf = Buffer.from(image, 'base64');

  try {
    const imageData = await Jimp.read(buf);

    const imageId = uuidv4();
    const fileName = `${imageId}.${imageData.getExtension()}`;

    const imagePath = path.join(__dirname, '..', '..', '..', 'tmp', 'uploads', fileName);

    await imageData.writeAsync(imagePath);
    return { fileName, mimeType: imageData.getMIME() };
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log('Erro ao savar, iamge', err.message);
    }
  }
};
