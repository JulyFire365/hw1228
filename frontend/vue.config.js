module.exports = {
	devServer: {
		proxy: 'http://www.hw.com'
	},
	
	outputDir: '../public',
	
	indexPath: process.env.NODE_ENV === 'production' ? '../views/index.php' : 'index.html'
}