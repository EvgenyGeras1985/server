const Router = require("express");
const router = new Router();
const goodController = require("../Controllers/goodsController");

router.get('/', goodController.getAll)
router.get('/:name', goodController.getOne)
router.post('/', goodController.create)
router.delete('/', goodController.delItem)


module.exports = router;