import app from '../../../../src/infra/app';
import request from "supertest"
import * as MeasureRepository from '../../../../src/adapters/repository/measureRepository';
import { measureFromDBMock, measureWithConfirmedValueFromDBMock } from '../../../mocks/confirmMocks';

describe("Test endpoint PATCH /confim", () => {

  beforeEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it("when Given Valid Data return the correct Object with status 200", async () => {
    const getMeasureByIdMock = jest
      .spyOn(MeasureRepository, 'getMeasureById')
      .mockResolvedValue(measureFromDBMock);
      
    const updateMeasureConfirmationMock = jest
      .spyOn(MeasureRepository, 'updateMeasureConfirmation')
      .mockResolvedValue();

      const response = await request(app).patch("/confirm").send({
        measure_uuid: "73b852e3-8d7d-4ebe-83b2-76a47f7ba976",
        confirmed_value: 44
      });

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({success: true});
    
  });

  it("when Given Inalid Measure UUID return the correct Object with status 400", async () => {
    const getMeasureByIdMock = jest
      .spyOn(MeasureRepository, 'getMeasureById')
      .mockResolvedValue(measureFromDBMock);
      
    const updateMeasureConfirmationMock = jest
      .spyOn(MeasureRepository, 'updateMeasureConfirmation')
      .mockResolvedValue();

      const response = await request(app).patch("/confirm").send({
        measure_uuid: "73b852e3-8d7d-4ebe-83b2-76a4ba976",
        confirmed_value: 44
      });
    expect(response.status).toBe(400);
    expect(response.body.errorDescription).toBe("Measure UUID is not valid");
    
  });

  it("when Given Invalid Confirmed Value return the correct Object with status 400", async () => {
    const getMeasureByIdMock = jest
      .spyOn(MeasureRepository, 'getMeasureById')
      .mockResolvedValue(measureFromDBMock);
      
    const updateMeasureConfirmationMock = jest
      .spyOn(MeasureRepository, 'updateMeasureConfirmation')
      .mockResolvedValue();

      const response = await request(app).patch("/confirm").send({
        measure_uuid: "73b852e3-8d7d-4ebe-83b2-76a47f7ba976",
        confirmed_value: "44"
      });
    expect(response.status).toBe(400);
    expect(response.body.errorDescription).toBe("Confirmed value is not valid");
    
  });

  it("when Given Valid Data but Mesurement do not Exist return the correct Object with status 400", async () => {
    const getMeasureByIdMock = jest
      .spyOn(MeasureRepository, 'getMeasureById')
      .mockResolvedValue(null);
      

      const response = await request(app).patch("/confirm").send({
        measure_uuid: "73b852e3-8d7d-4ebe-83b2-76a47f7ba976",
        confirmed_value: 44
      });
    expect(response.status).toBe(404);
    expect(response.body.errorDescription).toBe("Leitura do mês ainda não realizada");
    
  });

  it("when Given Valid Data but Confirmed Value already Exist return the correct Object with status 400", async () => {
    const getMeasureByIdMock = jest
      .spyOn(MeasureRepository, 'getMeasureById')
      .mockResolvedValue(measureWithConfirmedValueFromDBMock);
      
      const response = await request(app).patch("/confirm").send({
        measure_uuid: "73b852e3-8d7d-4ebe-83b2-76a47f7ba976",
        confirmed_value: 44
      });
    expect(response.status).toBe(404);
    expect(response.body.errorDescription).toBe("Leitura do mês já realizada");
    
  });
});