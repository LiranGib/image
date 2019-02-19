const express = require('express');
const router  = express.Router();
const Image = require('../models/image.js');
const uploadCloud = require('../config/cloudinary.js');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});




/* GET IMAGE PAGE */
router.get('/image-add', (req, res, next) => {
  Image.find()
  .populate('user')
  .then(imagesFromDB => {
    console.log(imagesFromDB)
    res.render('image-add', {images: imagesFromDB});
  })
});


router.post('/image/add', uploadCloud.single('photo'), (req, res, next) => {
  const { title, description } = req.body;
  console.log('user', req.user, req.currentUser, req.session)
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  const newImage = new Image({title, description, imgPath, imgName, user:req.session.currentUser._id})
  newImage.save()
  .then(image => {
    res.redirect('/image-add');
  })
  .catch(error => {
    console.log(error);
  })
});




module.exports = router;