const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.zo8jykc.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.DB_CLUSTERNAME}`;

module.exports = {
  URI
}