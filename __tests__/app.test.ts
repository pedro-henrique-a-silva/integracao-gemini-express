import app from '@infra/app';
import request from "supertest"


describe("Test default Route", () => {
  it("should return 200", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });
})