export type MeasureType = 'WATER' | 'GAS';

export type MeasurementRequestPayloadDto = {
  image: string,
  customerCode: string
  measureDatetime: string,
  measureType: MeasureType,
};

export type MeasurementSuceessResponseDto = {
  measure_uuid: string,
  measure_value: number,
  image_url: string,
};

export type MeasuresDto = {
  measure_uuid: string,
  measure_datetime: Date,
  measure_type: MeasureType,
  has_confirmed: boolean,
  image_url: string,
}

export type listOfMeasuresDto = {
  customer_code: string,
  measures: MeasuresDto[],
};


export type SavedImageInfo = {
  fileName: string,
  mimeType: string,
};

export type MeasureDataFromDB = {
  id: string,
  measureValue: number,
  imageUrl: string,
  customerId: string
  measureDate: Date,
  confirmedValue: number | null,
  measureType: MeasureType,
  createdAt: Date | null,
  updatedAt: Date | null,
};

export type MeasurementDataToPersist = Omit<
MeasureDataFromDB, 'createdAt' | 'updatedAt' | 'confirmedValue' | 'id'
>;
