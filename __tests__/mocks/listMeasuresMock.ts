import { MeasureDataFromDB } from "../../src/application/interface/Measure";

export const responsBodyListOfMeasuresMock = {
  customer_code: "da500959-00cc-4c5f-8fc8-b82242fee018",
  measures: [
    {
      measure_uuid: "73b852e3-8d7d-4ebe-83b2-76a47f7ba976",
      measure_datetime: "2020-01-01T00:00:00.000Z",
      measure_type: "GAS",
      has_confirmed: false,
      image_url: "http://localhost:3001/uploads/92be4b84-d0be-4cda-80fc-4dd4dbf0daca.jpeg"
    }
  ]
}

export const listOfMeasureFromDBMock = [
  {
    id: "73b852e3-8d7d-4ebe-83b2-76a47f7ba976",
    customerId: "cd52b784-9887-48ef-a3fc-4ed124be84e9",
    measureType: "GAS",
    measureValue: 44,
    confirmedValue: null,
    measureDate: new Date('2020-01-01T00:00:00Z'),
    imageUrl: "http://localhost:3001/uploads/92be4b84-d0be-4cda-80fc-4dd4dbf0daca.jpeg",
    createdAt: new Date("2020-01-01T00:00:00Z"),
    updatedAt: new Date("2020-01-01T00:00:00Z"),
  } as MeasureDataFromDB,
];