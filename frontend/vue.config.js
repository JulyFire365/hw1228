const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
	devServer: {
		proxy: 'http://www.hw.com'
	},

	chainWebpack: config => {
        config.resolve.symlinks(true)
    },
    
	outputDir: '../public',
	
	indexPath: process.env.NODE_ENV === 'production' ? '../views/index.php' : 'index.html',
	
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            return {
                plugins: [
                    new CompressionPlugin({
                        test: /\.js$|\.html$|\.css/,
                        threshold: 10240,
                        deleteOriginalAssets: false
                    })
                ]
            }
        }
    },
    
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