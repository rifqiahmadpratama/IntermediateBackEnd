const transaksiModel = require("../models/transaksi");
const transaksiController = {
  searchKeywordstransaksi: async (request, response) => {
    try {
      const keywords = "" || request.query.keyword;
      const result = await transaksiModel.searchKeywordstransaksi(keywords);
      response.status(200).json({
        data: result.rows,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getAlltransaksi: async (req, res) => {
    try {
      const currentPage = Number(req.query.currentPage) || 1;
      const numberPage = Number(req.query.numberPage) || 5;
      const startPage = (currentPage - 1) * numberPage;
      const sortby = req.query.sortby || "id";
      const sort = req.query.sort || "DESC";
      console.log(sort);
      const result = await transaksiModel.selectAll(
        numberPage,
        startPage,
        sort,
        sortby
      );
      const {
        rows: [count],
      } = await transaksiModel.counttransaksi();
      const totalData = parseInt(count.count);
      const totalPage = Math.ceil(totalData / numberPage);
      console.log(result);
      res.status(200).json({
        pagination: {
          currentPage: currentPage,
          numberPage: numberPage,
          totalData: totalData,
          totalPage: totalPage,
        },
        data: result.rows,
      });
    } catch (err) {
      console.log(err);
    }
  },
  gettransaksi: (req, res) => {
    const id = Number(req.params.id);
    transaksiModel
      .select(id)
      .then((result) => res.json(result.rows))
      .catch((err) => res.send(err));
  },
  insert: (req, res) => {
    const { id, address, trasaksi_detail_id } = req.body;
    transaksiModel
      .insert(id, address, trasaksi_detail_id)
      .then(res.json("transaksi created"))
      .catch((err) => res.send(err));
  },
  update: (req, res) => {
    const id = Number(req.params.id);
    const address = req.body.address;
    const trasaksi_detail_id = req.body.address;
    transaksiModel
      .update(id, address, trasaksi_detail_id)
      .then(res.json("Product updated"))
      .catch((err) => res.send(err));
  },
  delete: (req, res) => {
    const id = Number(req.params.id);
    transaksiModel
      .deletetransaksi(id)
      .then(res.json("Product deleted"))
      .catch((err) => res.send(err));
  },
};

module.exports = transaksiController;
