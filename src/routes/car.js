const { Router } = require('express')
const router = Router()
const Car = require('../models/car')
// const upload = require('../middleware/upload')

router.get('/', async (req, res) => {
  const { name, minPrice, maxPrice } = req.query; 

  let filter = {};

  if (name) {
    filter.name = new RegExp(name, 'i'); // Case-insensitive search
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) {
      filter.price.$gte = Number(minPrice); // Greater than or equal to minPrice
    }
    if (maxPrice) {
      filter.price.$lte = Number(maxPrice); // Less than or equal to maxPrice
    }
  }

  const cars = await Car.find(filter);
  res.json(cars);
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