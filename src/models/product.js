const Pool = require("../config/db");
//const { post } = require("../routes/product");

const searchKeywordsProduct = (keywords) => {
  return Pool.query("SELECT * FROM product WHERE id || ' ' || name ILIKE $1", [
    `%${keywords}%`,
  ]);
};
const selectAll = (numberPerPage, startPage, sort, sortby) => {
  return Pool.query(`SELECT * FROM product ORDER BY ${sortby} ${sort}
LIMIT ${numberPerPage} OFFSET ${startPage}`);
};
const select = (id) => {
  return Pool.query(`select * from product where id=${id}`);
};
const insert = (data) => {
  const {
    id,
    name,
    stock,
    price,
    photo,
    description,
    category_id,
    transaksi_id,
  } = data;
  return Pool.query(
    `INSERT INTO product(id,name,stock,price,photo,description,category_id,transaksi_id) VALUES('${id}','${name}','${stock}','${price}','${photo}','${description}','${category_id}','${transaksi_id}')`
  );
};
const update = (data) => {
  const {
    id,
    name,
    stock,
    price,
    photo,
    description,
    category_id,
    transaksi_id,
  } = data;
  return Pool.query(
    `UPDATE product SET name='${name}', stock=${stock}, price=${price} ,photo='${photo}' ,description='${description}', category_id=${category_id}, transaksi_id=${transaksi_id} WHERE id='${id}'`
  );
};

const deleteproduct = (id) => {
  return Pool.query(`DELETE FROM product WHERE id=${id};`);
};

const countproduct = () => {
  return Pool.query(`SELECT COUNT(*) FROM product`);
};
const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT id FROM product WHERE id=${id}`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

module.exports = {
  searchKeywordsProduct,
  selectAll,
  select,
  insert,
  update,
  deleteproduct,
  countproduct,
  findId,
};
