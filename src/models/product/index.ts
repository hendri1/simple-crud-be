import { IProduct, IProductDetail } from "../../types/product";
import { conn } from "../../connection";

import { OkPacket, RowDataPacket } from "mysql2";

export const create = (product: IProductDetail, callback: Function) => {
  const queryString = "INSERT INTO Product (name, description) VALUES (?, ?)"

  conn.query(
    queryString,
    [
      product.name,
      product.description,
    ],
    (err, result) => {
      if (err) {callback(err)};

      const insertId = (<OkPacket> result).insertId;
      callback(null, insertId);
    }
  );
};

export const findOne = (productId: number, callback: Function) => {
  const queryString = "SELECT * FROM Product WHERE id = ?";

  conn.query(
    queryString,
    productId,
    (err, result) => {
      if (err) {callback(err)};

      const row = (<RowDataPacket> result)[0];
      const product: IProduct =  {
        id: row.id,
        name: row.name,
        description: row.description,
      };
  
      callback(null, product);
    }
  );
};

export const findAll = (callback: Function) => {
  const queryString = "SELECT * FROM Product";

  conn.query(
    queryString,
    (err, result) => {
      if (err) {callback(err)};

      const rows = <RowDataPacket[]> result;
      const products: IProduct[] = [];

      if (rows.length > 0) {
        rows.forEach(row => {
          const product: IProduct =  {
            id: row.id,
            name: row.name,
            description: row.description,
          };
          products.push(product);
        });
      }
  
      callback(null, products);
    }
  );
};

export const update = (product: IProduct, callback: Function) => {
  const queryString = "UPDATE Product SET name=?, description=? WHERE id = ?";

  conn.query(
    queryString,
    [
      product.name,
      product.description,
      product.id,
    ],
    (err) => {
      if (err) {callback(err)};

      callback(null);
    }
  );
};
