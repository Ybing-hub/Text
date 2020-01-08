const path = require('path');
module.exports = {
	//配置服务
	devServer: {
	port: 3003,
	proxy: 'http://localhost:3000'
	},
	pluginOptions: {
	    'style-resources-loader': {
	      	preProcessor: 'less',
	      	patterns: [
	      		path.resolve(__dirname, './src/assets/less/index.less')
	      	]
	    }
  	},
  	//配置别名
  	chainWebpack:config =>{
	    config.resolve.alias
	    .set('pages',path.resolve(__dirname,'./src/pages'))
	    .set('api',path.resolve(__dirname,'./src/api'))
	}
}