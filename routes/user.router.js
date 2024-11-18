const express = require('express')
const router = express.Router()
const UserService = require('../services/users.service')
const service = new UserService()


router.get('/', async (req, res) => {
  const user = await service.find();
  res.json(user)
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await service.findOne(id);
    res.json(user);
  } catch (error) {
    next(error)
  }
});

// router.get('/', (req, res) => {
//   const { limit, offset } = req.query
//   if (limit && offset) {
//     res.json({
//       limit,
//       offset
//     })
//   } else {
//     res.send("no hay parametros")
//   }
// })

router.post('/', async (req, res) => {
  const body = req.body
  const newUser = await service.create(body);
  res.status(201).json(newUser);
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body;
    const updateUser = await service.update(id, body);
    res.json(updateUser)
  } catch (error) {
    next(error);
  };
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const deleteUser = await service.delete(id);
    res.json(deleteUser);
  } catch (error) {
    next(error);
  };
});


module.exports = router;
