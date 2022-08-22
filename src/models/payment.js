const Pool = require("../config/db");
//const { post } = require("../routes/payment");

const searchKeywordsPayment = (keywords) => {
  return Pool.query(
    "SELECT * FROM payment WHERE id || ' ' || amount ILIKE $1",
    [`%${keywords}%`]
  );
};
const selectAll = (numberPerPage, startPage, sort, sortby) => {
  return Pool.query(`SELECT * FROM payment ORDER BY ${sortby} ${sort}
LIMIT ${numberPerPage} OFFSET ${startPage}`);
};
const select = (id) => {
  return Pool.query(`select * from payment where id=${id}`);
};
const insert = (id, amount) => {
  return Pool.query(
    `INSERT INTO payment(id,amount) VALUES('${id}','${amount}')`
  );
};
const update = (id, amount) => {
  return Pool.query(`UPDATE payment SET amount='${amount}' WHERE id=${id}`);
};
const deletepayment = (id) => {
  return Pool.query(`DELETE FROM payment WHERE id=${id};`);
};

const countpayment = () => {
  return Pool.query(`SELECT COUNT(*) FROM payment`);
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
  searchKeywordsPayment,
  selectAll,
  select,
  insert,
  update,
  deletepayment,
  countpayment,
  findId,
};
