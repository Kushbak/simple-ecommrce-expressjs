const { Router } = require('express')
const router = Router()
const Car = require('../models/car')
// const upload = require('../middleware/upload')

router.get('/', async (req, res) => {
  const { name } = req.query

  let cars
  if (name) {
    cars = await Car.find({ name: new RegExp(name, 'i') })
  } else {
    cars = await Car.find()
  }

  res.json(cars)
})

router.get('/:carId', async (req, res) => {
  const car = await Car.findById(req.params.carId)
  res.json(car)
})

router.post(
  '/',
  // upload.single('img'), 
  async (req, res) => {
    const newCar = new Car({
      name: req.body.name,
      img: req.body.img,
      price: req.body.price,
    })

    await newCar.save()

    res.json({ message: 'Машина успешно создана', car: newCar })
  })

router.delete('/:carId', async (req, res) => {
  await Car.findByIdAndDelete(req.params.carId)
  res.json({ message: 'Машина успешно удалена' })
})

module.exports = router