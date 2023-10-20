import { RequestHandler } from "express";

export const newUserValidator: RequestHandler = (req, res, next) => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const { email } = req.body;
  if (!emailRegex.test(email)) {
    return res.status(422).json({ error: "Invalid email!" });
  }

  next();
};
