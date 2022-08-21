const paymentModel = require("../models/payment");

const paymentController = {
  searchKeywordsPayment: async (request, response) => {
    try {
      const keywords = "" || request.query.keyword;
      const result = await paymentModel.searchKeywordsPayment(keywords);
      response.status(200).json({
        data: result.rows,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getAllpayment: async (req, res) => {
    try {
      const currentPage = Number(req.query.currentPage) || 1;
      const numberPage = Number(req.query.numberPage) || 5;
      const startPage = (currentPage - 1) * numberPage;
      const sortby = req.query.sortby || "id";
      const sort = req.query.sort || "DESC";
      console.log(sort);
      const result = await paymentModel.selectAll(
        numberPage,
        startPage,
        sort,
        sortby
      );
      const {
        rows: [count],
      } = await paymentModel.countpayment();
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
  getpayment: (req, res) => {
    const id = Number(req.params.id);
    paymentModel
      .select(id)
      .then((result) => res.json(result.rows))
      .catch((err) => res.send(err));
  },
  insert: (req, res) => {
    const { id, amount } = req.body;
    paymentModel
      .insert(id, amount)
      .then(res.json("payment created"))
      .catch((err) => res.send(err));
  },
  update: (req, res) => {
    const id = Number(req.params.id);
    const amount = req.body.amount;
    paymentModel
      .update(id, amount)
      .then(res.json("Product updated"))
      .catch((err) => res.send(err));
  },
  delete: (req, res) => {
    const id = Number(req.params.id);
    paymentModel
      .deletepayment(id)
      .then(res.json("Product deleted"))
      .catch((err) => res.send(err));
  },
};

module.exports = paymentController;
