const Pool = require("../config/db");
//const { post } = require("../routes/transaksi_detail");

const searchKeywordstransaksi_detail = (keywords) => {
  return Pool.query(
    "SELECT * FROM transaksi_detail WHERE id || ' ' || total ILIKE $1",
    [`%${keywords}%`]
  );
};
const selectAll = (numberPerPage, startPage, sort, sortby) => {
  return Pool.query(`SELECT * FROM transaksi_detail ORDER BY ${sortby} ${sort}
LIMIT ${numberPerPage} OFFSET ${startPage}`);
};
const select = (id) => {
  return Pool.query(`select * from transaksi_detail where id=${id}`);
};
const insert = (id, total, payment_id) => {
  return Pool.query(
    `INSERT INTO transaksi_detail(id,total,payment_id) VALUES('${id}','${total}','${payment_id}')`
  );
};
const update = (id, total) => {
  return Pool.query(
    `UPDATE transaksi_detail SET total='${total}' WHERE id=${id}`
  );
};

const updateid = (id, payment_id) => {
  return Pool.query(
    `UPDATE transaksi_detail SET total='${payment_id}' WHERE id=${id}`
  );
};

const deletetransaksi_detail = (id) => {
  return Pool.query(`DELETE FROM transaksi_detail WHERE id=${id};`);
};

const counttransaksi_detail = () => {
  return Pool.query(`SELECT COUNT(*) FROM transaksi_detail`);
};

module.exports = {
  searchKeywordstransaksi_detail,
  selectAll,
  select,
  insert,
  update,
  updateid,
  deletetransaksi_detail,
  counttransaksi_detail,
};
