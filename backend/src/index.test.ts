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
    const res = await request(app).get(
      "/tinyurl/https://github.com/DevDesignAmitesh/macrorides-monorepo"
    );

    expect(res.statusCode).toBe(302);
  });

  it("it should return not found", async () => {
    const res = await request(app).get("/tinyurl/https://helllo.com");

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("not found");
  });

  it("it should return invalid url", async () => {
    const res = await request(app).get("/tinyurl/hello");

    expect(res.statusCode).toBe(411);
    expect(res.body.message).toBe("invalid inputs");
  });
});

describe("GET => /analytics/:uniqueUrl", () => {
  it("it should return the clicks", async () => {
    const res = await request(app).get(
      "/analytics/https://github.com/DevDesignAmitesh/macrorides-monorepo"
    );

    expect(res.statusCode).toBe(200);
    expect(typeof res.body.analytics).toBe("number");
  });

  it("it should return not found", async () => {
    const res = await request(app).get("/analytics/https://github.com");

    expect(res.statusCode).toBe(404);
    expect(res.body.analytics).toBe("not found");
  });

  it("it should return invalid inputs", async () => {
    const res = await request(app).get("/analytics/hello");

    expect(res.statusCode).toBe(411);
    expect(res.body.analytics).toBe("invalid inputs");
  });
});
