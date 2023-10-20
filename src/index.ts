import express from "express";
import "src/db";
import authRouter from "./routes/auth";

const app = express();

app.use(express.json());
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.json({ ok: true });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
