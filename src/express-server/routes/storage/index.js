const express = require("express");
const routerUsers = require("./users");
const routerPaintings = require("./paintings");

const router = express.Router();

router.use("/users", routerUsers);
router.use("/paintings", routerPaintings);

module.exports = router;