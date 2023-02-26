const Product = require('../model/product');
// const multer = require('multer')
// const path = require('path')

// const storage = multer.diskStorage({
// 	destination:(req,file,cb)=>{
// 		cb(null,'../public/img')
// 	},
// 	filename:(req,file,cb)=>{
// 		cb(null, Date.now()+ path.extname(file.originalname)) 
// 	}
// });

// const upload = multer({storage:storage})
module.exports.getAllProducts = (req, res) => {
	const limit = Number(req.query.limit) || 0;
	const sort = req.query.sort == 'desc' ? -1 : 1;

	Product.find()
		.limit(limit)
		.sort({ _id: sort })
		.then((products) => {
			
			if(products===null){
				return err
			}
			else{
				res.json(products)
			}
		}
		)
		.catch((err) => {
			res.json({
				massage:"No item found"
			})
		})
		
};

module.exports.getProduct = (req, res) => {
	const id = req.params.id;

	Product.findOne({
		id,
	})
		.then((product) =>{
			if(product===null){
				return err
			}
			else{
				res.json(product)
			}
		}
		)
		.catch((err) => {
			res.json({
				massage:"No item found"
			})
		})
		
};

module.exports.getProductCategories = (req, res) => {
	Product.distinct('category')
		.then((categories) => {
			res.json(categories);
		})
		.catch((err) => console.log(err));
};

module.exports.getProductsInCategory = (req, res) => {
	const category = req.params.category;
	const limit = Number(req.query.limit) || 0;
	const sort = req.query.sort == 'desc' ? -1 : 1;

	Product.find({
		category,
	})
		.select(['-_id'])
		.limit(limit)
		.sort({ id: sort })
		.then((products) => {
			res.json(products);
		})
		.catch((err) => console.log(err));
};

module.exports.addProduct =(req, res) => {
	if (typeof req.body == undefined) {
		res.json({
			status: 'error',
			message: 'data is undefined',
		});
	} else {
		let productCount = 0;		
		Product.find()
			.countDocuments(async function (err, count) {
				productCount = await count;			
			})
			.then(() => {
				console.log(req.body.image)
				const product = new Product({
					id: productCount+1,
					title: req.body.title,
					price: req.body.price,
					description: req.body.description,
					image: req.body.image.name,
					category: req.body.category,
					rating:req.body.rating
				});
				res.json("hahahah")
				// product.save()
				//   .then(product => 
				// 	res.json({status:200,product:product})
				// 	)
				// 	.catch(err =>res.json({status:401,massage:`something went wrong:: ${err} `}))
	})
};
}

module.exports.editProduct = (req, res) => {
	if (typeof req.body == undefined || req.params.id == null) {
		res.json({
			status: 'error',
			message: 'something went wrong! check your sent data',
		});
	} else {
		
		const newObj = {
			id: parseInt(req.params.id),
			title: req.body.title,
			price: req.body.price,
			description: req.body.description,
			category:req.body.category
		}
		
		Product.findOne({ _id: req.params.id })
		.then((product) => {
				
				if(product===null){
					return err
				}
					Product.updateOne(
						{ _id: req.params.id }, // Filter
						{$set: newObj} // Update
					).then((product) => {
						res.json(
							{
								status: 200,
								message: 'User data successfully updated',
							}
							);
					})
					.catch((err) => {
						res.json({
						status: 401,
						message: 'Something went wrong,Couldn\'t update the record',
						})
					});
			})
			.catch((err) => {
				res.json({
				status: 'error',
				message: 'Somethinggggggg went wrong,Couldn\'t update the record',
				})
			});		
	}
};

module.exports.deleteProduct = (req, res) => {
	if (req.params.id == null) {
		res.json({
			status: 'error',
			message: 'cart id should be provided',
		});
	} else {
		Product.findOne({ _id: req.params.id })
			.then((product) => {
				if(product===null){
					return err
				}
				Product.deleteOne({_id:req.params.id})
				.then((product)=>{
					res.json({status:200,massage:"user successfully deleted"});
				}).catch((err)=>{
					res.json({massage:"Some thing went wrong"});
				})
			})
			.catch((err) => {
				res.json({
					status: 401,
					message: 'user not found',
				});
			});
	}
};
