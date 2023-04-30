import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { z } from "zod";

export function createHandler() {
  return nextConnect<NextApiRequest, NextApiResponse>({
    onError(error, req, res) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: error.issues,
        });
      }
      return res.status(500).json({
        error: error?.message,
      });
    },
  });
}
