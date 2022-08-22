const client = require("../config/redis");
const { response } = require("../helper/common");

const hitCachepaymentDetail = async (req, res, next) => {
  const idpayment = req.params.id;
  const payment = await client.get(`payment/${idpayment}`);
  if (payment) {
    return response(
      res,
      JSON.parse(payment),
      200,
      "get data success from redis"
    );
  }
  next();
};

const clearCachepaymentDetail = (req, res, next) => {
  const idpayment = req.params.id;
  client.del(`payment/${idpayment}`);
  next();
};

module.exports = { hitCachepaymentDetail, clearCachepaymentDetail };
