import "dotenv/config";
import express from "express";
import { db, eq } from "./db";
import { urlsTable } from "./schema";
import { v4 as uuid } from "uuid";
import { getUrlSchema, UrlSchema } from "./types";

export const app = express();

app.use(express.json());

const base_url = process.env.BASE_URL;

console.log("base url", base_url);

app.post("/shorten", async (req, res) => {
  try {
    const { data, success, error } = UrlSchema.safeParse(req.body);

    if (!success) {
      return res.status(411).json({
        message: "invalid inputs",
        data: error.issues,
      });
    }
    const { url } = data;

    const uniqueId = uuid().slice(0, 6);

    const tinyUrl = base_url + "/" + uniqueId;

    await db.insert(urlsTable).values({
      orignalUrl: url,
      clicks: 0,
      uniqueId,
      uniqueUrl: tinyUrl,
    });

    return res.status(201).json({ message: "url shortened" });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
});

app.get("/tinyurl/:uniqueUrl", async (req, res) => {
  try {
    const { data, success, error } = getUrlSchema.safeParse(req.params);

    if (!success) {
      return res.status(411).json({
        message: "invalid inputs",
        data: error.issues,
      });
    }

    const { uniqueUrl } = data;

    const url = await db.query.urlsTable.findFirst({
      where: eq(urlsTable.uniqueUrl, uniqueUrl),
    });

    if (!url) {
      return res.status(404).json({ message: "not found" });
    }

    return res.redirect(302, uniqueUrl);
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
});

app.get("/analytics/:uniqueUrl", async (req, res) => {
  try {
    const { data, success, error } = getUrlSchema.safeParse(req.params);

    if (!success) {
      return res.status(411).json({
        message: "invalid inputs",
        data: error.issues,
      });
    }

    const { uniqueUrl } = data;

    const url = await db.query.urlsTable.findFirst({
      where: eq(urlsTable.uniqueUrl, uniqueUrl),
    });

    if (!url) {
      return res.status(404).json({ message: "not found" });
    }

    return res
      .status(200)
      .json({ message: "data found", analytics: url.clicks });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
});
