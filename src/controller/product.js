const productModel = require("../models/product");
const commonHelper = require("../helper/common");
const client = require("../config/redis");
const createError = require("http-errors");
const productController = {
  searchKeywordsProduct: async (request, response) => {
    try {
      const keywords = "" || request.query.keyword;
      const result = await productModel.searchKeywordsProduct(keywords);
      response.status(200).json({
        data: result.rows,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getAllproduct: async (req, res) => {
    try {
      const currentPage = Number(req.query.currentPage) || 1;
      const numberPage = Number(req.query.numberPage) || 5;
      const startPage = (currentPage - 1) * numberPage;
      const sortby = req.query.sortby || "id";
      const sort = req.query.sort || "DESC";
      console.log(sort);
      const result = await productModel.selectAll(
        numberPage,
        startPage,
        sort,
        sortby
      );
      const {
        rows: [count],
      } = await productModel.countproduct();
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
  getproduct: (req, res) => {
    const id = Number(req.params.id);
    productModel
      .select(id)
      .then((result) => {
        client.setEx(`product/${id}`, 60 * 60, JSON.stringify(result.rows));
        commonHelper.response(
          res,
          result.rows,
          200,
          "get data success from database"
        );
      })
      .catch((err) => res.send(err));
  },
  insertProduct: async (req, res) => {
    const PORT = process.env.PORT || 5000;
    const DB_HOST = process.env.DB_HOST || "localhost";
    const photo = req.file.filename;
    const { name, stock, price, description, category_id, transaksi_id } =
      req.body;
    const {
      rows: [count],
    } = await productModel.countproduct();
    const id = Number(count.count) + 1;

    const data = {
      id,
      name,
      stock,
      price,
      photo: `http://${DB_HOST}:${PORT}/img/${photo}`,
      description,
      category_id,
      transaksi_id,
    };
    productModel
      .insert(data)
      .then((result) =>
        commonHelper.response(res, result.rows, 201, "Product created")
      )
      .catch((err) => res.send(err));
  },
  updateProduct: async (req, res, next) => {
    try {
      const PORT = process.env.PORT || 5000;
      const DB_HOST = process.env.DB_HOST || "localhost";
      const id = Number(req.params.id);
      const photo = req.file.filename;
      const { name, stock, price, description, category_id, transaksi_id } =
        req.body;
      const { rowCount } = await productModel.findId(id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }
      const data = {
        id,
        name,
        stock,
        price,
        photo: `http://${DB_HOST}:${PORT}/img/${photo}`,
        description,
        category_id,
        transaksi_id,
      };
      productModel
        .update(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Product updated")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const { rowCount } = await productModel.findId(id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }
      productModel
        .deleteproduct(id)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Product deleted")
        )
        .catch((err) => res.send(err));
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = productController;
