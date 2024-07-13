const { Router } = require('express')
const router = Router()
const Favorite = require('../models/favorite')

router.get('/', async (req, res) => {
  const favorite = await Favorite
    .find()
    .populate('car')

  res.json(favorite)
})

router.get('/:favoriteId', async (req, res) => {
  console.log(req.query)
  const favorite = await Favorite.find({
    _id: req.params.favoriteId
  })
    .populate('car')
  res.json(favorite)
})

router.post('/', async (req, res) => {
  const candidate = await Favorite.findOne({ car: req.body.carId })
  if (!candidate) {
    const favorite = new Favorite({
      count: 1,
      car: req.body.carId
    })

    await favorite.save()

    res.json({ message: 'Машина добавлена в избранное' })
    return
  }
  res.json({ message: 'Машина уже в избранном' })
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
  await Favorite.deleteOne({ car: req.params.favoriteId })
  res.json({ message: 'Машина успешно удалена с избранного' })
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