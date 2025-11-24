import "dotenv/config"

export const BASE_URL =
  process.env.NODE_ENV === "prod" ? "" : "http://localhost:3001";
