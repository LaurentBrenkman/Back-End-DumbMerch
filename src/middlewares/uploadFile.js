// import package here
const multer = require('multer');

exports.uploadFile = (imageFile) => {
  
  // Destinasi penyimpanan foto yang sudah di upload
  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function(req, file, cb){
      cb(null, Date.now() + '-'+ file.originalname.replace(/\s/g,""));
    }
  })

  // Filter file yang akan di upload harus sesuai dengan format
  const fileFilter = function (req, file, cb){
    if(file.fieldname === imageFile){
      if(!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)){
        req.fileValidationError = {
          message: 'Onlty image files are allowed!'
        }

        return cb(new Error("Onlty image files are allowed!"), false)
      }
    }
    cb(null, true)
  }

  // Maximum File Size
  const size = 10;
  const maxSize = size * 1000 * 1000;
  const limits = {
    fileSize: maxSize
  }

 const upload = multer({
    storage,
    fileFilter,
    limits
    // upload foto dengan cara satu satu
  }).single(imageFile)



  return (req, res, next) => {
    upload(req, res, function (err) {

      // Filter
      if(req.fileValidationError){
        return res.send(req.fileValidationError)
      }
      
      // file kosong
      if(!req.file && !err){
        return res.send({
          message: 'Please select files to upload!'
        })
      }

      // batas maksimal foto
      if(err){
        if(err.code == "LIMIT_FILE_SIZE"){
          return res.send({
            message: 'Max file sized 10Mb'
          })
        }
        return res.send(err)
      }

      return next();
    })
  }
};