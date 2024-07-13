require('dotenv').config()
const express = require('express')
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const favoriteRouter = require('./routes/favorite')
const carRouter = require('./routes/car')

const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.zo8jykc.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.DB_CLUSTERNAME}`;

const app = express()

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'))

app.use('/favorite', favoriteRouter)
app.use('/car', carRouter)

const init = async () => {
  try {
    await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
    app.listen(process.env.PORT || 5000, () => {
      console.log('listening ' + process.env.PORT)
    })
  } catch(e) {
    console.log(e)
  }
}

init()