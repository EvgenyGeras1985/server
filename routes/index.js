const Router = require("express");
const router = new Router();
const goodsRoutes = require("./goodsRoutes");
const usersRoutes =  require("./usersRoutes");

router.use('/goods', goodsRoutes)
router.use('/users', usersRoutes)

module.exports = router;