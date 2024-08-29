import { Measures, PrismaClient } from '@prisma/client';
import {
  MeasureDataFromDB,
  MeasurementDataToPersist,
  MeasureType } from '../../application/interface/Measure';

export const prisma = new PrismaClient();

const prismaToModel = (measure: Measures): MeasureDataFromDB => ({
  id: measure.id,
  measureValue: measure.measureValue,
  imageUrl: measure.imageUrl,
  customerId: measure.customerId,
  measureDate: measure.measureDate,
  confirmedValue: measure.confirmedValue,
  measureType: measure.measureType as MeasureType,
  createdAt: measure.createdAt,
  updatedAt: measure.updatedAt,
});

export const createNewMeasure = async (
  measureData: MeasurementDataToPersist
): Promise<MeasureDataFromDB> => {
  const newMeasure = await prisma.measures.create({
    data: measureData,
  });
  return newMeasure;
};

export const getRecordForCurrentMonth = async (
  customerId: string,
  measureType: MeasureType,
  measureDate: Date,
): Promise<MeasureDataFromDB | null> => {
  const measure = await prisma.measures.findFirst({
    where: {
      customerId,
      measureType,
      measureDate: {
        gte: new Date(measureDate.getFullYear(), measureDate.getMonth(), 1),
        lt: new Date(measureDate.getFullYear(), measureDate.getMonth() + 1, 1),
      },
    },
  });

  if (measure) return prismaToModel(measure);

  return measure;
};

export const getMeasureById = async (
  measureId: string
): Promise<MeasureDataFromDB | null> => {
  const measure = await prisma.measures.findUnique({
    where: {
      id: measureId,
    },
  });

  if (measure) return prismaToModel(measure);

  return measure;
};

export const updateMeasureConfirmation = async (
  measureUuid: string, 
  confirmedValue: number
): Promise<void> => {
  const updatedMeasure = await prisma.measures.update({
    where: { id: measureUuid },
    data: { confirmedValue: confirmedValue },
  });
}

export const getAllMeasuresById = async (
  customerId: string, 
  measureType: MeasureType | undefined
): Promise<MeasureDataFromDB[]> => {
  const measures = await prisma.measures.findMany({
    where: {
      customerId,
      measureType,
    },
  });

  return measures.map(prismaToModel);
}