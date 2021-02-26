const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) => isDev 
?  `[name].${ext}` 
:  `[name].[contenthash].${ext}`

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: './js/main.js',
	output: {
		filename: `./js/${filename('js')}`,
		path: path.resolve(__dirname, 'dist'),
		// publicPath:''
	},
	devServer: {
		historyApiFallback: true,
		contentBase: path.resolve(__dirname, 'dist'),
		open: true,
		compress: true,
		hot: true,
		port: 3000,
	},
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
	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: 'html-loader'
			},
			{
				test: /\.scss$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader, 
						options: {
							publicPath: (resourcePath, context) => {
								return path.relative(path.dirname(resourcePath), context) + '/'
							}
						}
					},
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(?:|gif|png|jpg|jpeg|svg)$/i,
				use: [{
					loader: 'file-loader',
					options: {
						name: `./img/${filename('[ext]')}`
					}
				}]
			}		
		]
	}
};