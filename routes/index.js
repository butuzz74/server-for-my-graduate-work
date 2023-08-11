const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/projector", require("./projectors.routes"));

module.exports = router;
