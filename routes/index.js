const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/projector", require("./projectors.routes"));
router.use("/order", require("./order.routes"));
router.use("/user", require("./user.routes"));


module.exports = router;
