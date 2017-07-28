const path = require('path');

module.exports = {
	entry: path.join(__dirname, 'src', 'index'),
	output: {
		path: path.join(__dirname, '..','zarahia.com', 'public'),
		filename: 'bundle.js',
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			loader: 'babel-loader',
			include: path.join(__dirname, '')
		},]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	}
};
