let config;

try {
    config = require('/etc/discordia.json');
} catch (error) {
    config = {
        PUERTO: 3001,
        EMAIL: {
			service: 'gmail',
			auth: {
				user: '',
				pass: '',
			},
			usuario: '',
		},
        FIREBASE: {
            url: '',
            key: ''
        }
    }
}

module.exports = {
    config,
};