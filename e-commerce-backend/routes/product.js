const express = require("express");
const router = express.Router();
const product = require("../controller/product");

const multer = require('multer')
const path = require('path')

// const storage = multer.diskStorage({
// 	destination:(req,file,cb)=>{
// 		cb(null,'../public/img')
// 	},
// 	filename:(req,file,cb)=>{
// 		cb(null, Date.now()+ path.extname(file.originalname)) 
// 	}
// });

// const upload = multer({storage:storage})


router.get("/", product.getAllProducts);
router.get("/categories", product.getProductCategories);
router.get("/category/:category", product.getProductsInCategory);
router.get("/:id", product.getProduct);
router.post("/" ,product.addProduct);
router.put("/:id", product.editProduct);
router.patch("/:id", product.editProduct);
router.delete("/:id", product.deleteProduct);

module.exports = router;
