const express= require("express");
const { getUser, addUser, deleteUser, updateUser } = require("../controller/userController");
const router = express.Router()
router.get('/', getUser);
router.post('/', addUser);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);

module.exports = router;