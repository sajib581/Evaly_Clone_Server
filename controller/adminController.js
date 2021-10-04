const Product = require("../models/Product");

const addProduct = async (req, res, next) => {
  let newProduct ;
  let image = req.files.file;
  let productObject = JSON.parse(req.body.productInfo)

  if (image) {
    cloudinary.uploader.upload(image.tempFilePath, async function (error, result) {
      if (!error) {
        newProduct = new Product({
          ...productObject,
          image: result.url,
          addedBy : {
            id : req.userId,
            name : req.username,
            email : req.email
          }
        });
        
        console.log(newProduct);
      
        // save product in database
        try {
          const result = await newProduct.save();
          res.status(200).json({
            message: "One Product is added successfully!",
          });
        } catch (error) {
          res.status(500).json({
            errors: {
              common: {
                msg: error.message ,
              },
            },
          });
        }
      }else {
        next("image upload problem")
      }

    });
  }
  else{
    console.log("222222222222");
    console.log("Cloudinary error : ",error);
    next('Image must be included');
  }
};

module.exports = {
  addProduct,
};
