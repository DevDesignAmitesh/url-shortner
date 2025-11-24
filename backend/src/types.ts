import z from "zod";

export const UrlSchema = z.object({
  url: z.url(),
});


export const getUrlSchema = z.object({
  uniqueUrl: z.url(),
});


