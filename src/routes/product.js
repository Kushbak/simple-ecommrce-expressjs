const { Router } = require('express')
const router = Router()
const Product = require('../models/product')

router.get('/', async (req, res) => {
  const products = await Product.find()
  res.json(products)
})

router.get('/:productId', async (req, res) => {
  const product = await Product.findById(req.params.productId)
  res.json(product)
})

router.post('/', async (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    img: req.body.img,
    price: req.body.price,
  })

  await newProduct.save()

  res.json({ message: 'Товар успешно создан', product: newProduct })
})

router.delete('/:productId', async (req, res) => {
  await Product.findByIdAndDelete(req.params.productId)
  res.json({ message: 'Товар успешно удален' })
})

module.exports = router