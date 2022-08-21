const transaksi_detailModel = require("../models/transaksi_detail");
const transaksi_detailController = {
  searchKeywordstransaksi_detail: async (request, response) => {
    try {
      const keywords = "" || request.query.keyword;
      const result = await transaksi_detailModel.searchKeywordstransaksi_detail(
        keywords
      );
      response.status(200).json({
        data: result.rows,
      });
    } catch (error) {
      console.log(error);
    }
  },

  getAlltransaksi_detail: async (req, res) => {
    try {
      const currentPage = Number(req.query.currentPage) || 1;
      const numberPage = Number(req.query.numberPage) || 5;
      const startPage = (currentPage - 1) * numberPage;
      const sortby = req.query.sortby || "id";
      const sort = req.query.sort || "DESC";
      console.log(sort);
      const result = await transaksi_detailModel.selectAll(
        numberPage,
        startPage,
        sort,
        sortby
      );
      const {
        rows: [count],
      } = await transaksi_detailModel.counttransaksi_detail();
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
  gettransaksi_detail: (req, res) => {
    const id = Number(req.params.id);
    transaksi_detailModel
      .select(id)
      .then((result) => res.json(result.rows))
      .catch((err) => res.send(err));
  },
  insert: (req, res) => {
    const { id, total, payment_id } = req.body;
    transaksi_detailModel
      .insert(id, total, payment_id)
      .then(res.json("transaksi_detail created"))
      .catch((err) => res.send(err));
  },
  update: (req, res) => {
    const id = Number(req.params.id);
    const total = req.body.total;
    const payment_id = req.body.payment_id;
    transaksi_detailModel
      .update(id, total, payment_id)
      .then(res.json("Product updated"))
      .catch((err) => res.send(err));
  },
  delete: (req, res) => {
    const id = Number(req.params.id);
    transaksi_detailModel
      .deletetransaksi_detail(id)
      .then(res.json("Product deleted"))
      .catch((err) => res.send(err));
  },
};

module.exports = transaksi_detailController;
