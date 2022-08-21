const Pool = require("../config/db");
//const { post } = require("../routes/transaksi");

const searchKeywordstransaksi = (keywords) => {
  return Pool.query(
    "SELECT * FROM transaksi WHERE id || ' ' || address ILIKE $1",
    [`%${keywords}%`]
  );
};
const selectAll = (numberPerPage, startPage, sort, sortby) => {
  return Pool.query(`SELECT * FROM transaksi ORDER BY ${sortby} ${sort}
LIMIT ${numberPerPage} OFFSET ${startPage}`);
};
const select = (id) => {
  return Pool.query(`select * from transaksi where id=${id}`);
};
const insert = (id, address, transaksi_detail_id) => {
  return Pool.query(
    `INSERT INTO transaksi(id,address,transaksi_detail_id) VALUES('${id}','${address}','${transaksi_detail_id}')`
  );
};
const update = (id, address) => {
  return Pool.query(`UPDATE transaksi SET address='${address}' WHERE id=${id}`);
};

const updateid = (id, transaksi_detail_id) => {
  return Pool.query(
    `UPDATE transaksi SET transaksi_detail_id='${transaksi_detail_id}' WHERE id=${id}`
  );
};
const deletetransaksi = (id) => {
  return Pool.query(`DELETE FROM transaksi WHERE id=${id};`);
};

const counttransaksi = () => {
  return Pool.query(`SELECT COUNT(*) FROM transaksi`);
};

module.exports = {
  searchKeywordstransaksi,
  selectAll,
  select,
  insert,
  update,
  updateid,
  deletetransaksi,
  counttransaksi,
};
