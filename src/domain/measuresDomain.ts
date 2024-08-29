import DoubleReportException from '../adapters/exceptions/DoubleReportException';
import getMeasureFromGemini from '../infra/gemini/apiGemini';
import {
  MeasureDataFromDB,
  MeasurementRequestPayload,
  MeasureType } from '../application/interface/Measure';
import { saveImageBase64IntoFile } from './utils/utils';
import {
  createNewMeasure,
  getRecordForCurrentMonth } from '../adapters/repository/measureRepository';

export const isMeasurementDoneForCurrentMonth = async (
  customerId: string,
  measureType: MeasureType,
  measureDate: Date,
): Promise<void> => {
  const measures = await getRecordForCurrentMonth(customerId, measureType, measureDate);

  if (measures) {
    throw new DoubleReportException('Leitura do mês já realizada');
  }
};

export const processMeasurementUpload = async (
  measureData: MeasurementRequestPayload,
): Promise<MeasureDataFromDB> => {
  const {
    image, custumerCode: custumerId, measureDatetime: measureDate, measureType,
  } = measureData;

  await isMeasurementDoneForCurrentMonth(custumerId, measureType, new Date(measureDate));

  const result = await saveImageBase64IntoFile(image);

  if (result) {
    const measureValue = await getMeasureFromGemini(result.imagePath, result.mimeType);

    const createdMeasure = await createNewMeasure({
      custumerId,
      measureDate: new Date(measureDate),
      measureType,
      imageUrl: result.imagePath,
      measureValue,
    });
    return createdMeasure;
  }
};

export default {};
