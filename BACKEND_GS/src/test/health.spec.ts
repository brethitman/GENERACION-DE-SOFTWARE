// src/test/health.spec.ts
import request from "supertest";
import { describe, it, expect } from "vitest";

import app from "../app";

describe("GET /api/v1/health", () => {
  it("debería responder 200 y ok:true", async () => {
    const res = await request(app).get("/api/v1/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });
});
