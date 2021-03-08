const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const AssetsPlugin = require("assets-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const KssWebpackPlugin = require("kss-webpack-plugin");

const config = {
	module: {},
};

const designConfig = Object.assign({}, config, {
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: true,
			}),
			new OptimizeCSSAssetsPlugin({}),
		],
	},
	entry: {
		app: "./design",
	},
	mode: "production",
	module: {
		rules: [
			{
				test: /\.ts?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					}, // extracts CSS into separate files
					{
						loader: "css-loader", // deals with css imports
					},
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [require("autoprefixer")],
							},
						},
					},
					{
						loader: "sass-loader",
						options: {
							sassOptions: {
								includePaths: ["./node_modules"],
							},
							// Prefer Dart Sass
							implementation: require("sass"),

							// See https://github.com/webpack-contrib/sass-loader/issues/804
							webpackImporter: false,
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: [".ts", ".scss", ".css", ".js"],
		modules: [path.resolve(__dirname, "node_modules")],
	},
	watchOptions: {
		aggregateTimeout: 300,
		poll: 1000,
	},
	plugins: [
		new CleanWebpackPlugin(["js", "css"], {
			root: path.join(__dirname, "hugo/static/design"),
			beforeEmit: true,
			watch: true,
		}),
		new MiniCssExtractPlugin({
			filename: "css/[name].[chunkhash].css",
			chunkFilename: "[id].css",
		}),
		new AssetsPlugin({
			filename: "webpack_assets.json",
			path: path.join(__dirname, "./hugo/data/"),
			prettyPrint: true,
		}),
	],
	output: {
		filename: `js/[name].[chunkhash].js`,
		path: path.resolve(__dirname, "hugo/static/design"),
	},
});

// KSS CONFIG--------------------
const docConfig = Object.assign({}, config, {
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: true,
			}),
			new OptimizeCSSAssetsPlugin({}),
		],
	},
	entry: {
		app: "./design",
	},
	mode: "production",
	module: {
		rules: [
			{
				test: /\.ts?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					}, // extracts CSS into separate files
					{
						loader: "css-loader", // deals with css imports
					},
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [require("autoprefixer")],
							},
						},
					},
					{
						loader: "sass-loader",
						options: {
							sassOptions: {
								includePaths: ["./node_modules"],
							},
							// Prefer Dart Sass
							implementation: require("sass"),

							// See https://github.com/webpack-contrib/sass-loader/issues/804
							webpackImporter: false,
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: [".ts", ".scss", ".css", ".js"],
		modules: [path.resolve(__dirname, "node_modules")],
	},
	plugins: [
		new CleanWebpackPlugin(["js", "css"], {
			root: path.join(__dirname, "design/dist/"),
			beforeEmit: true,
		}),
		new MiniCssExtractPlugin({
			filename: "css/styles.css",
		}),
		new KssWebpackPlugin({
			source: path.join(__dirname, "design/scss"),
			destination: path.join(__dirname, "design/styleguide/"),
			css: "../dist/css/styles.css",
			js: "../dist/js/app.js",
			builder: path.join(__dirname, "ksstemplate"),
		}),
	],
	output: {
		filename: `js/app.js`,
		path: path.resolve(__dirname, "design/dist"),
	},
});

module.exports = [designConfig, docConfig];
