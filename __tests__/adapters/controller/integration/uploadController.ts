import app from '../../../../src/infra/app';
import { base64WaterMeterImageMock } from '../../../mocks/imageWaterMeterMock';
import request from "supertest"


describe("Test endpoint POST /upload", () => {
  it("when Given Valid Data return the correct Object with status 200", async () => {
    const response = await request(app).post("/upload").send({
      "image": base64WaterMeterImageMock,
      "customer_code": "da500959-00cc-4c5f-8fc8-b82242fee018",
      "measure_datetime": new Date(),
      "measure_type": "WATER"
    });
    
    expect(response.status).toBe(200);
    expect(response.body.message).toHaveProperty(['image_url', 'measure_value', 'measure_uuid']);
});
});