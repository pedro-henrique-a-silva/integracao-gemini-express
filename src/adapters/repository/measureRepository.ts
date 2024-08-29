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

export const createNewMeasure = async (measureData: MeasurementDataToPersist) => {
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
