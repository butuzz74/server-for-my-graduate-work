const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/good", require("./goods.routes"));
router.use("/order", require("./order.routes"));
router.use("/user", require("./user.routes"));


module.exports = router;
