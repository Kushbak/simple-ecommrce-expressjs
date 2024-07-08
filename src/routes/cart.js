const { Router } = require('express')
const router = Router()
const Cart = require('../models/cart')

router.get('/', async (req, res) => {
  const cart = await Cart
  .find()
  .populate('order')
  
  res.json(cart)
})

router.get('/:cartId', async (req, res) => {
  console.log(req.query)
  const cart = await Cart.find({
    _id: req.params.cartId
  })
  .populate('order')
  res.json(cart)
})

router.post('/', async (req, res) => {
  const cart = new Cart({
    count: 1,
    order: req.body.orderId
  })

  await cart.save()

  res.json({ message: 'Товар успешно добавлен в корзину' })
})

router.put('/:cartId', async (req, res) => {
  const cartItem = await Cart.findById(req.params.cartId)

  const toChange = {
    count: req.body.count
  }
  Object.assign(cartItem, toChange)
  await cartItem.save()

  res.json(cartItem)
})

router.delete('/:cartId', async (req, res) => {
  await Cart.deleteOne({ _id: req.params.cartId })
  res.json({ message: 'Товар успешно удален' })
})

router.delete('/', async (req, res) => {
  await Cart.deleteMany()
  res.json({ message: 'Корзина очищена' })
})


// Написать роут для удаления
// в парамс принимает айди cart элемента
// сделать удаление с базы данных смотря на документацию
// возвратить сообщение об успешном выполнении

module.exports = router