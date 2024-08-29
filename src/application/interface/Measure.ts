export type MeasureType = 'WATER' | 'GAS';

export type MeasurementRequestPayload = {
  image: string,
  custumerCode: string
  measureDatetime: string,
  measureType: MeasureType,

};

export type SavedImageInfo = {
  imagePath: string,
  mimeType: string,
};

export type MeasureDataFromDB = {
  id: string,
  measureValue: number,
  imageUrl: string,
  custumerId: string
  measureDate: Date,
  confirmedValue: number | null,
  measureType: MeasureType,
  createdAt: Date | null,
  updatedAt: Date | null,
};

export type MeasurementDataToPersist = Omit<
MeasureDataFromDB, 'createdAt' | 'updatedAt' | 'confirmedValue' | 'id'
>;
