const Image = require('../models/Image')
const crypto = require('crypto')

const createImage = async (req, res) => {
  try {
    const image = new Image({
      ...req.body,
      imageId: crypto.randomUUID()
    })
    await image.save()
    res.status(201).json(image)
  }
  catch (error) { res.status(500).json(error) }
}

const findImage = async (req, res) => {
  try {
    const image = await Image.findOne(req.params)
    if(!image){
      return res.status(404).json({ 'error': 'Image not found' })
    }
    res.status(200).json(image)
  }
  catch (error) { res.status(500).json(error) }
}

const deleteImage = async (req, res) => {
  try {
    const image = await Image.findOneAndDelete(req.params)
    if(!image){
      return res.status(404).json({ 'message': 'Image not found' })
    }
    res.status(200).json({ 'message': 'Image deleted' })
  }
  catch (error) { res.status(500).json(error) }
}

module.exports = {
  createImage,
  findImage,
  deleteImage
}