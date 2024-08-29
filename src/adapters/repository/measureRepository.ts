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
  custumerId: measure.custumerId,
  measureDate: measure.measureDate,
  confirmedValue: measure.confirmedValue,
  measureType: measure.measureType,
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
  custumerId: string,
  measureType: MeasureType,
  measureDate: Date,
): Promise<MeasureDataFromDB | null> => {
  const measure = await prisma.measures.findFirst({
    where: {
      custumerId,
      measureType,
      measureDate: {
        gte: new Date(measureDate.getFullYear(), measureDate.getMonth(), 1),
        lt: new Date(measureDate.getFullYear(), measureDate.getMonth() + 1, 1),
      },
    },
  });
  console.log(measure);

  if (measure) return prismaToModel(measure);

  return measure;
};
