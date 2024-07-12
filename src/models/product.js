const { Schema, model } = require('mongoose')

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  // todo change img to file, not string
  img: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
})

ProductSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
})

module.exports = model('Product', ProductSchema)