import { Request } from "express";

import * as productModel from "../../models/product";
import { IProduct, IProductDetail } from "../../types/product";

export const create = async (req: Request, callback: Function) => {
  const newProduct: IProductDetail = req.body;
  productModel.create(newProduct, (err: Error, id: number) => {
    if (err) callback(err);

    callback(null, {"id": id});
  });
};

export const findAll = async (callback: Function) => {
  productModel.findAll((err: Error, products: IProduct[]) => {
    if (err) callback(err);

    callback(null, {"data": products});
  });
};

export const findOne = async (req: Request, callback: Function) => {
  const productId: number = Number(req.params.id);
  productModel.findOne(productId, (err: Error, product: IProduct) => {
    if (err) callback(err);

    callback(null, {"data": product});
  });
};

export const update = async (req: Request, callback: Function) => {
  const productId: number = Number(req.params.id);
  const updateProduct: IProductDetail = req.body;

  productModel.update({
    id: productId,
    ...updateProduct,
  }, (err: Error) => {
    if (err) callback(err);

    callback(null);
  });
};