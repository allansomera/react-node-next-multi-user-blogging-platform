const { Schema, model, models } = require('mongoose')

const categorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      max: 32,
      required: true,
    },
    //slug expample 'new-arrival'
    slug: {
      type: String,
      unique: true,
      index: true,
    },
  },
  //this is one way of setting the collection name
  // { timestamps: true, strict: true, strictQuery: true, collection: 'categories' }
  { timestamps: true, strict: true, strictQuery: true }
)

// var M = mongoose.model('Actor', schema, collectionName);
// 3rd parameter is the collection name we manually set
const Category =
  models?.Category || model('Category', categorySchema, 'categories')

module.exports = Category
