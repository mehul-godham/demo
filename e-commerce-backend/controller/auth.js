const User = require('../model/user');
const jwt = require('jsonwebtoken');

module.exports.login = (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	if (email && password) {
		User.findOne({
			email: email,
			password: password,
		})
			.select(['-password'])
			.then((user) => {
				if (user) {
					res.json({
						status:200,
						token: jwt.sign({ user: email }, 'secret_key'),
						user:user
					});
				} else {
					// res.status(401);
					res.json({status:401,massage:'Username or Password is incorrect'});
				}
			})
			.catch((err) => {
				console.error(err);
			});
	}
};
