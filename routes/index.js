const express = require("express");
const router = express.Router();
const morgan = require("morgan");
const auth_route = require("./auth");
const media_handling = require("./media.routes");
const users_route = require("./users.routes");
const v1 = express.Router();
v1.use(morgan("dev"));

v1.use("/", [auth_route, media_handling, users_route]);

router.use("/v1", v1);

module.exports = router;
