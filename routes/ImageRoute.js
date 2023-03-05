const router = require('express').Router()
const ImageController = require('../controllers/ImageController')

router.route('/image/:imageId')
  .get(ImageController.findImage)
  .delete(ImageController.deleteImage)

router.route('/image')
  .post(ImageController.createImage)

module.exports = router