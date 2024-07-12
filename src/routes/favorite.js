const { Router } = require('express')
const router = Router()
const Favorite = require('../models/favorite')

router.get('/', async (req, res) => {
  const favorite = await Favorite
  .find()
  .populate('order')
  
  res.json(favorite)
})

router.get('/:favoriteId', async (req, res) => {
  console.log(req.query)
  const favorite = await Favorite.find({
    _id: req.params.favoriteId
  })
  .populate('order')
  res.json(favorite)
})

router.post('/', async (req, res) => {
  const favorite = new Favorite({
    count: 1,
    order: req.body.orderId
  })

  await favorite.save()

  res.json({ message: 'Товар успешно добавлен в корзину' })
})

router.put('/:favoriteId', async (req, res) => {
  const favoriteItem = await Favorite.findById(req.params.favoriteId)

  const toChange = {
    count: req.body.count
  }
  Object.assign(favoriteItem, toChange)
  await favoriteItem.save()

  res.json(favoriteItem)
})

router.delete('/:favoriteId', async (req, res) => {
  await Favorite.deleteOne({ _id: req.params.favoriteId })
  res.json({ message: 'Товар успешно удален' })
})

router.delete('/', async (req, res) => {
  await Favorite.deleteMany()
  res.json({ message: 'Корзина очищена' })
})


// Написать роут для удаления
// в парамс принимает айди favorite элемента
// сделать удаление с базы данных смотря на документацию
// возвратить сообщение об успешном выполнении

module.exports = router