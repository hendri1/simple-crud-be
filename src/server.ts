import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";

import { productRouter } from "@/routes/product";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => res.send("Express + TypeScript Server"));
app.use("/product", productRouter);


app.listen(PORT, () => {
  console.log(`Server is running at https://localhost:${PORT}`);
});
