import { Request, Response } from "express";
import { getImage } from "../../domain/imagesDomain";

const getImageController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const image = await getImage(id);

  const imageBuffer = Buffer.from(image.imageBase64Format, 'base64');
  
  res.set('Content-Type', image.mimeType);
  res.send(imageBuffer);
}

export default getImageController;