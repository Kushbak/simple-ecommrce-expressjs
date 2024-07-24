const { Router } = require('express')
const router = Router()
const Car = require('../models/car')
const upload = require('../middleware/upload')
const { gfsClient } = require('../config')

// todo add sort by name and price
router.get('/', async (req, res) => {
  const { name, minPrice, maxPrice, sort } = req.query;

  // gfsClient.gfs.find().toArray(async (err, files) => {
  try {
    let filter = {};

    if (name) {
      filter.name = new RegExp(name, 'i')
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) {
        filter.price.$gte = Number(minPrice)
      }
      if (maxPrice) {
        filter.price.$lte = Number(maxPrice)
      }
    }

    let sortQuery = {};
    if (sort) {
      const sortField = sort.includes('name') ? 'name' : 'price'
      const order = sort[0] === '-' ? -1 : 1
      sortQuery[sortField] = order
    }

    const cars = await Car.find(filter).sort(sortQuery);
    // const data = cars.map(item => {
    //   const file = files.find(file => file.filename === item.img)
    //   item.img = file ? 'https://simple-ecommrce-expressjs.onrender.com/image/' + file.filename : null
    // })
    res.json(cars);

  } catch (e) {
    console.log('Server Error', e)
  }
  // })

})

router.get('/:carId', async (req, res) => {
  try {
    // gfsClient.gfs.files.find().toArray(async (err, files) => {
    // console.log('ewq')
    // if (err) {
    //   console.log({ err })
    //   res.json(500).message({ err: 'Error' })
    // }
    // console.log({ files })
    const car = await Car.findById(req.params.carId)
    // const file = files.find(file => file.filename === car.img)
    // car.img = file ? 'https://simple-ecommrce-expressjs.onrender.com/image/' + file.filename : null
    res.json(car)
    // })
  } catch (e) {
    console.log('Server Error', e)
  }
})

router.post(
  '/',
  // upload.single('img'),
  async (req, res) => {
    try {
      const newCar = new Car({
        name: req.body.name,
        img: req.body.img,
        // img: req.file.filename,
        price: req.body.price,
      })

      await newCar.save()
      res.json({ message: 'Машина успешно создана', car: newCar })
    } catch (e) {
      console.log('Server Error', e)
    }
  })

router.delete('/:carId', async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.carId)
    res.json({ message: 'Машина успешно удалена' })
  } catch (e) {
    console.log('Server Error', e)
  }
})

router.put('/:carId', async (req, res) => {
  try {
    const candidate = await Car.findById(req.params.carId)
    if (candidate) {
      if (req.body.img) candidate.img = req.body.img
      if (req.body.name) candidate.name = req.body.name
      if (req.body.price) candidate.price = req.body.price

      await candidate.save()
      res.json({ message: 'Данные машины успешно изменены' })
    } else {
      res.status(404).json({ message: 'Машина с таким айди не найдена' })
    }
  } catch (e) {
    console.log('server error', e)
  }
})

module.exports = router