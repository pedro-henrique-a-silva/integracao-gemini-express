import  redisClient from  '../../infra/database/redis/redisApi';

const IMAGE_EXPIRATION_TIME = process.env.IMAGE_EXPIRATION_TIME || 1;

export const saveImageInCacheDatabase = async (
  fileId: string,
  imageBase64Format: string,
  mimeType: string,
) => {
  if (!redisClient.isReady) await redisClient.connect();

  await redisClient.set(fileId, JSON.stringify({ imageBase64Format, mimeType}), {
    EX: 60 * Number(IMAGE_EXPIRATION_TIME),
  });
}

export const getImageFromCacheDatabase = async (fileId: string): Promise<string | null> => {
  if (!redisClient.isReady) await redisClient.connect();

  const imageBase64Data = await redisClient.get(fileId);

  return imageBase64Data
}

