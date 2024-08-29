import DoubleReportException from '../adapters/exceptions/DoubleReportException';
import { getMeasureFromGemini } from '../infra/gemini/apiGemini';
import {
  MeasureDataFromDB,
  MeasurementDataToPersist,
  MeasurementRequestPayloadDto,
  MeasurementSuceessResponseDto,
  MeasureType } from '../application/interface/Measure';
import { saveImageBase64IntoFile } from './utils/utils';
import {
  createNewMeasure,
  getMeasureById,
  getRecordForCurrentMonth, 
  updateMeasureConfirmation} from '../adapters/repository/measureRepository';
import { ServiceResponse } from '../application/interface/Responses';
import MeasureNotFoundException from '../adapters/exceptions/MeasureNotFoundException';
import ConfirmationDuplicatedException from '../adapters/exceptions/ConfirmationDuplicatedException';

export const convertMeasurePayloadToPersistDataType = (
  measureData: MeasurementRequestPayloadDto,
): Omit<MeasurementDataToPersist, 'measureValue' | 'imageUrl'> => ({
  customerId: measureData.customerCode,
  measureDate: new Date(measureData.measureDatetime),
  measureType: measureData.measureType,
});

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
  measureData: MeasurementRequestPayloadDto,
): Promise<ServiceResponse<MeasurementSuceessResponseDto>> => {
  const {
    image, customerCode: custumerId, measureDatetime: measureDate, measureType,
  } = measureData;

  await isMeasurementDoneForCurrentMonth(custumerId, measureType, new Date(measureDate));

  const result = await saveImageBase64IntoFile(image);

  if (result) {
    const measureValue = await getMeasureFromGemini(result.fileName, result.mimeType);

    const measureDataToPersist = convertMeasurePayloadToPersistDataType(measureData);
    const createdMeasure = await createNewMeasure({ 
      measureValue, imageUrl: `http://localhost:3001/uploads/${result.fileName}`, ...measureDataToPersist 
    });

    const response = {
      measure_uuid: createdMeasure.id,
      measure_value: createdMeasure.measureValue,
      image_url: createdMeasure.imageUrl,
    };

    return { status: 'SUCCESSFUL', data: response };
  }
  return { status: 'UNABLE_TO_PROCESS', data: { message: 'Erro ao processar solicitação' } };
};

export const processMeasurementConfirmation = 
async (measureUuid: string, confirmedValue: number): Promise<ServiceResponse<{success: boolean}>> => {
  const measure = await getMeasureById(measureUuid);

  if (!measure) {
    throw new MeasureNotFoundException('Leitura do mês ainda não realizada');
  }

  if (measure.confirmedValue) {
    throw new ConfirmationDuplicatedException('Leitura do mês já realizada');
  }

  updateMeasureConfirmation(measureUuid, confirmedValue);

  return { status: 'SUCCESSFUL', data: { success: true } };
}
