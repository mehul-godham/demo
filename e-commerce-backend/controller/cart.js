const { response } = require('express');
const Cart = require('../model/cart');

module.exports.getAllCarts = (req, res) => {
	const limit = Number(req.query.limit) || 0;
	const sort = req.query.sort == 'desc' ? -1 : 1;
	const startDate = req.query.startdate || new Date('1970-1-1');
	const endDate = req.query.enddate || new Date();

	console.log(startDate, endDate);

	Cart.find({
		date: { $gte: new Date(startDate), $lt: new Date(endDate) },
	})
		.select('-_id -products._id')
		.limit(limit)
		.sort({ id: sort })
		.then((carts) => {
			res.json(carts);
		})
		.catch((err) => console.log(err));
};

module.exports.getCartsbyUserid = (req, res) => {
	const userId = req.params.userid;
	const startDate = req.query.startdate || new Date('1970-1-1');
	const endDate = req.query.enddate || new Date();

	console.log(startDate, endDate);
	Cart.find({
		userId,
		date: { $gte: new Date(startDate), $lt: new Date(endDate) },
	})
		.select('-_id -products._id')
		.then((carts) => {
			if(carts===null){
				return err
			}
			else{
				res.json(carts)
			}
		}
		)
		.catch((err) => {
			res.json({
				massage:"No item found"
			})
		})
		
};

module.exports.getSingleCart = (req, res) => {
	const id = req.params.id;
	Cart.findOne({
		id,
	})
		.select('-_id -products._id')
		.then((cart) => {
			if(cart===null){
				return err
			}
			else{
				res.json(cart)
			}
		}
		)
		.catch((err) => {
			res.json({
				massage:"No item found"
			})
		});
};  

module.exports.addCart = (req, res) => {
	if (typeof req.body == undefined) {
		res.json({
			status: 'error', 
			message: 'data is undefined',
		});
	} else {
		let cartCount = 0;		
		Cart.find()
			.countDocuments(function (err, count) {
				cartCount = count;	
			})
			.then(() => {
				const cart = new Cart({
					id: cartCount+1,
					userId: req.body.userId,
					date: req.body.date,
					products: req.body.products,
				});
				cart.save()
				  .then(cart => 
					res.json(cart)
					)
				  .catch(err => console.log(err))
	})
};
};

module.exports.editCart = (req, res) => {
	if (typeof req.body == undefined || req.params.id == null) {
		res.json({
			status: 'error',
			message: 'something went wrong! check your sent data',
		});
	} else {

		const newObj = {
					id: parseInt(req.params.id),
					userId: req.body.userId,
					date: req.body.date,
					products: req.body.products,
				}

		Cart.findOne({ id: req.params.id })
			.then((cart) => {
				if(cart===null){
					return err
				}
					Cart.updateOne(
						{ id: req.params.id }, // Filter
						{$set: newObj} // Update
					).then((cart) => {
						res.json(
							{
								status: 'success',
								message: 'User data successfully updated',
							}
							);
					})
					.catch((err) => {
						res.json({
						status: 'error',
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

module.exports.deleteCart = (req, res) => {

	if (req.params.id == null) {
		res.json({
			status: 'error',
			message: 'cart id should be provided',
		});
	} else {
		Cart.findOne({ id: req.params.id })
			.then((cart) => {
				if(cart===null){
					return err
				}
				Cart.deleteOne({id:req.params.id})
				.then((product)=>{
					res.json({massage:"user successfully deleted"});
				}).catch((err)=>{
					res.json({massage:"Some thing went wrong"});
				})
			})
			.catch((err) => {
				res.json({
					status: 'error',
					message: 'user not found',
				});
			});
	}

};
