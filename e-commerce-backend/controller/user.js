const { rawListeners } = require('../model/user');
const User = require('../model/user');

module.exports.getAllUser = (req, res) => {
	const limit = Number(req.query.limit) || 0;
	const sort = req.query.sort == 'desc' ? -1 : 1;

	User.find()
		.select(['-_id'])
		.limit(limit)
		.sort({
			id: sort,
		})
		.then((users) => {
			if (users === null) {
				return err
			}
			else {
				res.json(users)
			}
		}
		)
		.catch((err) => {
			res.json({
				massage: "No user found"
			})
		})

};

module.exports.getUser = (req, res) => {
	const _id = req.params._id;

	User.findOne({
		_id,
	})
		.then((user) => {
			if (user === null) {
				return err
			}
			else {
				res.json({status:200,user:user})
			}
		}
		)
		.catch((err) => {
			res.json({
				status:401,
				massage: "No user found"
			})
		})

};

module.exports.addUser = (req, res) => {

	if (typeof req.body == undefined) {
		res.json({
			status: 'err',
			message: 'data is undefined',
		});
	}
	else {
		User.findOne({ email: req.body.email })
			.then((user) => {
				if (user !== null) {
					res.json({
						status: 401,
						message: `User with email ${req.body.email} is already exists`
					})
				}
				else {
					let userCount = 0;
					User.find()
						.countDocuments(function (err, count) {
							userCount = count;
						})
						.then(() => {
							
							const user = new User({
								id: userCount + 1,
								email: req.body.email,
								password: req.body.password,
								name: {
									firstname: req.body.name.firstname,
									lastname: req.body.name.lastname,
								},
								address: {
									city: req.body.address.city,
									street: req.body.address.street,
									number: req.body.address.number,
									zipcode: req.body.address.zipcode,
									geolocation: {
										lat: req.body.address.geolocation.lat,
										long: req.body.address.geolocation.long,
									},
								},
								phone: req.body.phone,
							});
							user.save()
								.then(user =>
									res.json({ status: 200, user: user })
								)
								.catch(err => res.json({ status: 401, massage: "Something went wrong,try again" }))
						});
				}
			})
	}
};

module.exports.editUser = (req, res) => {
	if (typeof req.body == undefined || req.params.id == null) {
		res.json({
			status: 'error',
			message: 'something went wrong! check your sent data',
		});
	} else {
		const newObj = {
			email: req.body.email,
			name: {
				firstname: req.body.name.firstname,
				lastname: req.body.name.lastname,
			},
			address: {
				city: req.body.address.city,
				street: req.body.address.street,
				number: req.body.address.number,
				zipcode: req.body.address.zipcode,
				geolocation: {
					lat: req.body.address.geolocation.lat,
					long: req.body.address.geolocation.long,
				},
			},
			phone: req.body.phone,
		}

		User.findOne({ _id: req.params.id })
			.then((user) => {
				if (user === null) {
					return err
				}
				User.updateOne(
					{ _id: req.params.id }, // Filter
					{ $set: newObj } // Update
				).then((user) => {
					res.json(
						{
							status: 'success',
							message: 'User data successfully updated',
							user: user
						}
					);
				})
					.catch((err) => {
						res.json({
							status: 'error',
							message: 'Something went wrong,Couldn\'t update the record',
							err: err
						})
					});
			})
			.catch((err) => {
				res.json({
					status: 'error',
					message: 'Somethinggggggg went wrong,Couldn\'t update the record',
					err: err
				})
			});
	}
};

module.exports.deleteUser = (req, res) => {
	if (req.params.id == null) {
		res.json({
			status: 'error',
			message: 'cart id should be provided',
		});
	} else {
		User.findOne({ id: req.params.id })
			.then((user) => {
				if (user === null) {
					return err
				}
				User.deleteOne({ id: req.params.id })
					.then((user) => {
						res.json({ massage: "user successfully deleted" });
					}).catch((err) => {
						res.json({ massage: "Some thing went wrong" });
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
