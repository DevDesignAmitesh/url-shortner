import "dotenv/config";
import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from ".";

describe("POST => /shorten", () => {
  it("this should returns the shortern url", async () => {
    const res = await request(app).post("/shorten").send({
      url: "https://github.com/DevDesignAmitesh/macrorides-monorepo",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("url shortened");
  });

  it("this should returns invalid url", async () => {
    const res = await request(app).post("/shorten").send({
      url: "hello mother heller",
    });

    expect(res.statusCode).toBe(411);
    expect(res.body.message).toBe("invalid inputs");
  });
});

describe("GET => /tinyurl/:uniqueUrl", () => {
  it("it should redirect successfully", async () => {
    const uniqueUrl = "http://localhost:3001/b272d3";

    const res = await request(app).get(
      `/tinyurl/${encodeURIComponent(uniqueUrl)}`
    );

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("done");
  });

  it("it should return not found", async () => {
    const uniqueUrl = "http://localhost:3001/11111";

    const res = await request(app).get(
      `/tinyurl/${encodeURIComponent(uniqueUrl)}`
    );
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("not found");
  });

  it("it should return invalid url", async () => {
    const res = await request(app).get(
      `/tinyurl/${encodeURIComponent("hello")}`
    );

    expect(res.statusCode).toBe(411);
    expect(res.body.message).toBe("invalid inputs");
  });
});

describe("GET => /analytics/:uniqueUrl", () => {
  it("it should return the clicks", async () => {
    const uniqueUrl = "http://localhost:3001/b272d3";

    const res = await request(app).get(
      `/analytics/${encodeURIComponent(uniqueUrl)}`
    );

    expect(res.statusCode).toBe(200);
    expect(typeof res.body.analytics).toBe("number");
  });

  it("it should return not found", async () => {
    const res = await request(app).get(
      `/analytics/${encodeURIComponent("https://github.com")}`
    );

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("not found");
  });

  it("it should return invalid inputs", async () => {
    const res = await request(app).get(
      `/analytics/${encodeURIComponent("hello")}`
    );

    expect(res.statusCode).toBe(411);
    expect(res.body.message).toBe("invalid inputs");
  });
});
