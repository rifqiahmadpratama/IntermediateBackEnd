const paymentModel = require("../models/payment");
const createError = require("http-errors");
const commonHelper = require("../helper/common");
const client = require("../config/redis");

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
      .then((result) => {
        client.setEx(`payment/${id}`, 60 * 60, JSON.stringify(result.rows));
        commonHelper.response(
          res,
          result.rows,
          200,
          "get data success from database"
        );
      })
      .catch((err) => res.send(err));
  },
  insertPayment: async (req, res) => {
    const amount = req.body;
    const {
      rows: [count],
    } = await paymentModel.countpayment();
    const id = Number(count.count) + 1;

    const data = {
      id,
      amount,
    };
    paymentModel
      .insert(data)
      .then((result) =>
        commonHelper.response(res, result.rows, 201, "Payment created")
      )
      .catch((err) => res.send(err));
  },
  updatePayment: async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const amount = req.body;
      const { rowCount } = await paymentModel.findId(id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }
      const data = {
        id,
        amount,
      };
      paymentModel
        .update(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Payment updated")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const { rowCount } = await paymentModel.findId(id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }
      paymentModel
        .deletepayment(id)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Payment deleted")
        )
        .catch((err) => res.send(err));
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = paymentController;
