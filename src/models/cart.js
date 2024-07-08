const { Schema, model } = require('mongoose')

const CartSchema = new Schema({
  count: {
    type: Number,
    default: 1,
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order',   
    required: true
  },
})

CartSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
})

module.exports = model('Cart', CartSchema)