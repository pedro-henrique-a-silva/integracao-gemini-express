import ImageNotFoundException from "../adapters/exceptions/ImageNotFoundException";
import { getImageFromCacheDatabase } from "../adapters/repository/cacheDataBaseRepository";
import { ImageData } from "../application/interface/Measure";

const getImage = async (fileId: string): Promise<ImageData> => {
  const imageBase64Data = await getImageFromCacheDatabase(fileId);

  if (!imageBase64Data) throw new ImageNotFoundException('Image not found');

  return JSON.parse(imageBase64Data)
}

export default getImage;