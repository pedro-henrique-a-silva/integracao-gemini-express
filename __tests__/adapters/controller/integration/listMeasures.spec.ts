import app from '../../../../src/infra/app';
import request from "supertest"
import * as MeasureRepository from '../../../../src/adapters/repository/measureRepository';
import { listOfMeasureFromDBMock, responsBodyListOfMeasuresMock } from '../../../mocks/listMeasuresMock';

describe("Test endpoint GET /:customerId/list", () => {

  beforeEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it("when Given Valid Data return the correct Object with status 200", async () => {
    const getAllMeasuresByIdMock = jest
      .spyOn(MeasureRepository, 'getAllMeasuresById')
      .mockResolvedValue(listOfMeasureFromDBMock);
      

      const response = await request(app).get("/da500959-00cc-4c5f-8fc8-b82242fee018/list").send();

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(responsBodyListOfMeasuresMock);
    
  });

  it("when Given Invalid CustomerId Param return the correct Object with status 400", async () => {
    const response = await request(app).get("/da500959-00cc-4c5f-8fc8-b822ee018/list").send();

    expect(response.status).toBe(400);
    expect(response.body.errorDescription).toStrictEqual("Customer UUID is not valid");
  });

  it("when Given Invalid Measure Type Query Param return the correct Object with status 400", async () => {
    const response = await request(app).get("/da500959-00cc-4c5f-8fc8-b82242fee018/list?measureType").send();

    expect(response.status).toBe(400);
    expect(response.body.errorDescription).toStrictEqual("Tipo de medição não permitida");

    const response2 = await request(app).get("/da500959-00cc-4c5f-8fc8-b82242fee018/list?measureType=FOOD").send();

    expect(response.status).toBe(400);
    expect(response.body.errorDescription).toStrictEqual("Tipo de medição não permitida");
  });

  it("when Given Valid Measure Type Query Param return the correct Object with status 200", async () => {
    const getAllMeasuresByIdMock = jest
      .spyOn(MeasureRepository, 'getAllMeasuresById')
      .mockResolvedValue(listOfMeasureFromDBMock);

    const response = await request(app).get("/da500959-00cc-4c5f-8fc8-b82242fee018/list?measureType=GAS").send();

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(responsBodyListOfMeasuresMock);
  });


  it("whe Given valid data but no measures are found, return the correct object with a 200 status.", async () => {
    const getAllMeasuresByIdMock = jest
      .spyOn(MeasureRepository, 'getAllMeasuresById')
      .mockResolvedValue([]);

    const response = await request(app).get("/da500959-00cc-4c5f-8fc8-b82242fee018/list?measureType=GAS").send();

    expect(response.status).toBe(404);
    expect(response.body.errorDescription).toStrictEqual("Nenhuma leitura encontrada");
  });

});