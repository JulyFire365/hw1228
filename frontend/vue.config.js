module.exports = {
	devServer: {
		proxy: 'http://www.hw.com'
	},
	
	outputDir: '../public',
	
	indexPath: process.env.NODE_ENV === 'production' ? '../views/index.php' : 'index.html',
	
	css: {
        extract: true, // 是否使用css分离插件 ExtractTextPlugin
        sourceMap: false, // 开启 CSS source maps?
        loaderOptions: {
            less: {
                javascriptEnabled: true //less 配置
            }
        }, // css预设器配置项
        requireModuleExtension: true // 启用 CSS modules for all css / pre-processor files.
    }
}