const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) => isDev 
	?  `[name].${ext}` 
	:  `[name].[contenthash].${ext}`

const optimization = () => {
	const configObj = {
		splitChunks: {
			chunks: 'all'
		}
	};

	if(isProd) {
		configObj.minimizer = [
			new OptimizeCssAssetsWebpackPlugin(),
			new TerserWebpackPlugin()
		];
	}
	return configObj;
}

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: './js/main.js',
	output: {
		filename: `./js/${filename('js')}`,
		path: path.resolve(__dirname, 'dist')
	},
	devServer: {
		historyApiFallback: true,
		contentBase: path.resolve(__dirname, 'dist'),
		open: true,
		compress: true,
		hot: true,
		port: 3000,
	},
	optimization: optimization(),
	// target: ['web', 'es5'],
	plugins: [
		new HTMLWebpackPlugin({
			template: path.resolve(__dirname, 'src/index.html'),
			filename: 'index.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: `./css/${filename('css')}`
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src/assets'),
					to: path.resolve(__dirname, 'dist')
				}
			]
		}) 
	],
	devtool: isProd ? false : 'source-map',
	module: {
		rules: [
			{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    // options: {
                    //     presets: ['@babel/preset-env']
                    // }
                }
            },	
			{
				test: /\.html$/i,
				loader: 'html-loader'
			},
			{
				test: /\.(scss)$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: (resourcePath, context) => {
								return path.relative(path.dirname(resourcePath), context) + '/'
							}
						}
					}, 'css-loader', 'postcss-loader', 'sass-loader'
				],
			},
			{
				test: /\.(png|jpg|jpeg|svg)$/i,
				type: 'asset/resource'
			}
		]
	}
};