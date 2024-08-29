import { MeasureDataFromDB } from "../../src/application/interface/Measure";

export const measureFromDBMock = {
  id: "cd52b784-9887-48ef-a3fc-4ed124be84e9",
  customerId: "cd52b784-9887-48ef-a3fc-4ed124be84e9",
  measureType: "GAS",
  measureValue: 44,
  confirmedValue: null,
  measureDate: new Date('2020-01-01T00:00:00Z'),
  imageUrl: "url_image",
  createdAt: new Date("2020-01-01T00:00:00Z"),
  updatedAt: new Date("2020-01-01T00:00:00Z"),
} as MeasureDataFromDB;


export const measureWithConfirmedValueFromDBMock = {
  id: "cd52b784-9887-48ef-a3fc-4ed124be84e9",
  customerId: "cd52b784-9887-48ef-a3fc-4ed124be84e9",
  measureType: "GAS",
  measureValue: 44,
  confirmedValue: 45,
  measureDate: new Date('2020-01-01T00:00:00Z'),
  imageUrl: "url_image",
  createdAt: new Date("2020-01-01T00:00:00Z"),
  updatedAt: new Date("2020-01-01T00:00:00Z"),
} as MeasureDataFromDB;