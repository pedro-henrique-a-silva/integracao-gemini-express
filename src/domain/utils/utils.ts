import Jimp from 'jimp';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import InvalidDataException from '../../adapters/exceptions/InvalidDataException';
import { SavedImageInfo } from '../../application/interface/Measure';
import { saveImageInCacheDatabase } from '../../adapters/repository/cacheDataBaseRepository';

export const checkIfImageBase64IsValid = async (image: string): Promise<void> => {
  const buf = Buffer.from(image, 'base64');

  try {
    await Jimp.read(buf);
  } catch (_err) {
    throw new InvalidDataException('Image is not valid');
  }
};

export const saveImageBase64IntoFile = async (
  imageBase64Format: string,
): Promise<SavedImageInfo | undefined> => {
  const buf = Buffer.from(imageBase64Format, 'base64');

  try {
    const imageData = await Jimp.read(buf);

    const imageId = uuidv4();

    const mimeType = imageData.getMIME();

    await saveImageInCacheDatabase(imageId, imageBase64Format, mimeType);
    return {fileId: imageId, imageBase64Format,  mimeType};
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log('Erro ao savar, image', err.message);
    }
  }
};
