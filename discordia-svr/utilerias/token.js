const jwt = require('jsonwebtoken');

const tokenSecret = '5tbZ(tfLcW6FXVmT@58%UvT&9Pohhs93';

const generarTokenSesion = (usuarioId) => {
	const token = jwt.sign({
		usuarioId: usuarioId,
		plataforma: 'Web',
	},
	tokenSecret,
	{
		audience: ['DISCORDIA'],
		expiresIn: '5h',
		issuer: 'DISCORDIA',
	});
	return token;
};

const validarToken = (req, res, next) => {
	if (req.headers.authorization) {
		const auth = req.headers.authorization;
		const token = auth.split(' ')[1];
		try {
			const decoded = jwt.verify(token, tokenSecret);

			if (decoded) {
				//if (req.body.usuarioId === decoded.usuarioId) {
					next();
				// } else {
				// 	res.sendStatus(401);
				// }
			} else {
				res.sendStatus(401);
			}
		} catch (e) {
			res.sendStatus(401);
		}
	} else {
		res.sendStatus(401);
	}
};

const renovarToken = (req) => {
	const auth = req.headers?.authorization;
	let token = auth?.split(' ')[1];
	const decoded = jwt.verify(token, tokenSecret);
	//console.log(decoded);ñ
	// eslint-disable-next-line no-constant-condition
	if ((decoded.plataforma = 'Web')) {
		token = generarTokenSesion(decoded.usuarioId);
	}
	//console.log(jwt.verify(token, tokenSecret));
	return token;
};

module.exports = {
	validarToken,
	generarTokenSesion,
	renovarToken,
};