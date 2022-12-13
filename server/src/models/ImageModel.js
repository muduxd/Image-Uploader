const { Schema, model } = require("mongoose")

const ImageSchema = new Schema({
  image: {
    type: Buffer,
    required: true,
    trim: true,
  },

  title: {
    type: String,
    required: true,
    trim: true
  }
})


const ImageModel = new model("image", ImageSchema)

module.exports = ImageModel
