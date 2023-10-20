import {
  adminResponse,
  createUser,
  privateResponse,
  sendProfile,
  signin,
} from "@/controllers/auth";
import { newUserValidator } from "@/middleware/validator";
import UserModel from "@/models/user";
import { Router } from "express";
import { RequestHandler } from "express-serve-static-core";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

const authRouter = Router();

declare global {
  namespace Express {
    interface Request {
      user: {
        [key: string]: any;
      };
    }
  }
}

const isAuth: RequestHandler = async (req, res, next) => {
  try {
    const authorizationToken = req.headers.authorization;
    const token = authorizationToken?.split("Bearer ")[1];
    if (!token) return res.status(403).json({ error: "unauthorized access!" });

    const payload = jwt.verify(token, "secret") as { id: string };

    const user = await UserModel.findById(payload.id);
    if (!user) return res.status(403).json({ error: "unauthorized access!" });

    req.user = user;

    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      res.status(403).json({ error: "unauthorized access!" });
    } else {
      res.status(500).json({ error: "Something went wrong!" });
    }
  }
};

const isAdmin: RequestHandler = async (req, res, next) => {
  if (req.user.role === "admin") next();
  else res.status(403).json({ error: "Protected only for admin!" });
};

authRouter.post("/signup", newUserValidator, createUser);
authRouter.post("/signin", newUserValidator, signin);
authRouter.get("/profile", isAuth, sendProfile);
authRouter.get("/private", isAuth, privateResponse);
authRouter.get("/admin", isAuth, isAdmin, adminResponse);

export default authRouter;
