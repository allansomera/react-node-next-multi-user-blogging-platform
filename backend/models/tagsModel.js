const { Schema, model, models } = require('mongoose')

const tagSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      max: 32,
      required: true,
    },
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
const Tag = models?.Category || model('Tag', tagSchema)

module.exports = Tag
