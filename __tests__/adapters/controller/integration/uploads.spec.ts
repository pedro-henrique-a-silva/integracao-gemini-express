import app from '../../../../src/infra/app';
import { base64GasMeterImageMock } from '../../../mocks/imageGasMeterMock';
import { base64WaterMeterImageMock } from '../../../mocks/imageWaterMeterMock';
import * as MeasureDomain from '../../../../src/domain/measuresDomain';
import * as UtilsModule from '../../../../src/domain/utils/utils';
import * as GeminiModule from '../../../../src/infra/gemini/apiGemini';
import * as MeasureRepository from '../../../../src/adapters/repository/measureRepository';
import request from "supertest"
import { dataFromDBMock } from '../../../mocks/uploadsMock';


describe("Test endpoint POST /upload", () => {

  beforeEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it("when Given Valid Data return the correct Object with status 200", async () => {
    const isMeasurementDoneForCurrentMonthMock = jest
      .spyOn(MeasureDomain, 'isMeasurementDoneForCurrentMonth')
      .mockResolvedValue();

    const saveImageBase64IntoFileMock = jest
      .spyOn(UtilsModule, 'saveImageBase64IntoFile')
      .mockResolvedValue({ fileName: 'test', mimeType: 'image/jpeg' });

    const getMeasureFromGeminiMock = jest
      .spyOn(GeminiModule, 'getMeasureFromGemini')
      .mockResolvedValue(44);

    const createNewMeasureMock = jest
      .spyOn(MeasureRepository, 'createNewMeasure')
      .mockResolvedValue(dataFromDBMock);

      const response = await request(app).post("/upload").send({
        "image": base64GasMeterImageMock,
        "customer_code": "da500959-00cc-4c5f-8fc8-b82242fee018",
        "measure_datetime": new Date(),
        "measure_type": "WATER"
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('image_url');
    expect(response.body).toHaveProperty('measure_value');
    expect(response.body).toHaveProperty('measure_uuid');
  });

  it("when Given Invalid ImageBase64Format return status 400 with correct Message", async () => {
    const response = await request(app).post("/upload").send({
      "image": base64WaterMeterImageMock,
      "customer_code": "da500959-00cc-4c5f-8fc8-b82242fee018",
      "measure_datetime": new Date(),
      "measure_type": "WATER"
    });
    
    expect(response.status).toBe(400);
    expect(response.body.errorDescription).toBe("Image is not valid");
  });

  it("when Given Invalid customer_code return status 400 with correct Message", async () => {
    const response = await request(app).post("/upload").send({
      "image": base64GasMeterImageMock,
      "customer_code": "da500959-00cc-4c5f-8fc8-b822ee018",
      "measure_datetime": new Date(),
      "measure_type": "WATER"
    });
    expect(response.status).toBe(400);
    expect(response.body.errorDescription).toBe("Customer code is not valid");
  });

  it("when Given Invalid measure_datetime return status 400 with correct Message", async () => {
    const response = await request(app).post("/upload").send({
      "image": base64GasMeterImageMock,
      "customer_code": "da500959-00cc-4c5f-8fc8-b82242fee018",
      "measure_datetime": "13-09-2222",
      "measure_type": "WATER"
    });
    expect(response.status).toBe(400);
    expect(response.body.errorDescription).toBe("Measure datetime is not valid");
  });

  it("when Given Invalid measure_type return status 400 with correct Message", async () => {
    const response = await request(app).post("/upload").send({
      "image": base64GasMeterImageMock,
      "customer_code": "da500959-00cc-4c5f-8fc8-b82242fee018",
      "measure_datetime": new Date(),
      "measure_type": "AGUA"
    });
    expect(response.status).toBe(400);
    expect(response.body.errorDescription).toBe("Measure type is not valid");
  });

  it("when Measure was already made return status 400 with correct Message", async () => {
    const getRecordForCurrentMonthMock = jest
      .spyOn(MeasureRepository, 'getRecordForCurrentMonth')
      .mockResolvedValue(dataFromDBMock);

    const response = await request(app).post("/upload").send({
      "image": base64GasMeterImageMock,
      "customer_code": "da500959-00cc-4c5f-8fc8-b82242fee018",
      "measure_datetime": new Date(),
      "measure_type": "GAS"
    });
    expect(response.status).toBe(409);
    expect(response.body.errorDescription).toBe("Leitura do mês já realizada");
  });
});