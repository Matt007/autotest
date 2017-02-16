var webpack = require("webpack");

module.exports = {
	context: __dirname + "/app",
	watch: true,
	entry: {
		home: 			__dirname + "/src/components/pages/Home.js",
		Details: 		__dirname + "/src/components/pages/Details.js"
	},
	
	plugins: [
//		new webpack.optimize.UglifyJsPlugin()	
	],
	
	
	output: {
		filename: "[name].js",
		path: __dirname + "/public/components",
	},

	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loaders: ["babel-loader"]
		},
		{
			test: /\.scss$/,
			loader: 'style!css!sass?outputStyle=compressed'
		},
		{
	        test: /\.css$/,
	        loaders: [ 'style-loader', 'css-loader' ]
		}
		]
	},
	sassLoader: {
		includePaths: [
			'./node_modules',
			// this is required only for NPM < 3.
			// Dependencies are flat in NPM 3+ so pointing to
			// the internal grommet/node_modules folder is not needed
			'./node_modules/grommet/node_modules'
		]
	}

};