export interface MeasurementRequestPayload {
  image: string,
  customerCode: string
  measureDatetime: string,
  measureType: 'WATER' | 'GAS',
}

export interface saveImageBase64IntoFileReturn {
  imagePath: string,
  mimeType: string,
}

export interface MeasurementDataToPersist extends MeasurementRequestPayload {
  measureValue: number,
}
