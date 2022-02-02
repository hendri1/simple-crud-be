import { Request, Response, Router } from "express";

import * as productController from "../../controllers/product";
import { IProduct } from "../../types/product";

const productRouter = Router();

productRouter.post("/", async (req: Request, res: Response) => {
  productController.create(req, (err: Error, data: number) => {
    if (err) {
      return res.status(500).json({"errorMessage": err.message});
    }

    res.status(200).json(data);
  });
});

productRouter.get("/", async (req: Request, res: Response) => {
  productController.findAll((err: Error, data: IProduct[]) => {
    if (err) {
      return res.status(500).json({"errorMessage": err.message});
    }

    res.status(200).json(data);
  });
});

productRouter.get("/:id", async (req: Request, res: Response) => {
  productController.findOne(req, (err: Error, data: IProduct) => {
    if (err) {
      return res.status(500).json({"errorMessage": err.message});
    }

    res.status(200).json(data);
  });
});

productRouter.put("/:id", async (req: Request, res: Response) => {
  productController.update(req, (err: Error, id: number) => {
    if (err) {
      return res.status(500).json({"errorMessage": err.message});
    }

    res.status(200).send();
  });
});

export { productRouter };

