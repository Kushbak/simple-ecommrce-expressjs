const { Schema, model } = require('mongoose')

const CarSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  // todo change img to file, not string
  img: {
    type: String,
    required: false
  },
  price: {
    type: Number,
    required: true
  },
  isFavorite: {
    type: Boolean,
    default: false,
    required: false,
  }
})

CarSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
})

module.exports = model('Car', CarSchema)