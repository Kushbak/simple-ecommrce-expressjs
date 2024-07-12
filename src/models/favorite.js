const { Schema, model } = require('mongoose')

const FavoriteSchema = new Schema({
  count: {
    type: Number,
    default: 1,
  },
  car: {
    type: Schema.Types.ObjectId,
    ref: 'Car',   
    required: true
  },
})

FavoriteSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
})

module.exports = model('Favorite', FavoriteSchema)