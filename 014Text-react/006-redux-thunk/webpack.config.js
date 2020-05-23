const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')//自动生成HTML
const {CleanWebpackPlugin} = require('clean-webpack-plugin');//自动清理无用文件

module.exports = {
	// "production" 开发环境； "development"生产环境； "none"不指定
  	mode:'development',


	// 这里应用程序开始执行，是入口
  	// webpack 开始打包// string | object | array 
  	//单一入口两种方法
  	// entry: './src/index.js',
  	// entry:{index:'./src/index.js'},
  	//多入口
  	entry:{
  		index:'./src/index.js'
  	},
  

  	//出口，输出
  	output: {// webpack 如何输出结果的相关选项
  		// 所有输出文件的目标路径
    	// 必须是绝对路径（使用 Node.js 的 path 模块）// string
    	path: path.resolve(__dirname, 'dist'),

    	// 「入口分块(entry chunk)」的文件名模板（出口分块？）// string  
    	//对于单个入口,出口可以是一个静态文件
  		// filename: 'bundle.js'
  		//对于多个入口,也只指定一个输出配置
  		filename: '[name]-[hash].bundle.js'
  	},
   	module: {
	   	rules: [
  	     {//处理CSS资源
  	       test: /\.css$/,
  	       use: [
  	         'style-loader',
  	         'css-loader'
  	       ]
  	     },
  	     {//处理图片资源
  	       test: /\.(png|svg|jpg|gif)$/,
  	       use: [
  	         {
  	         	loader:'url-loader',
  	         	options:{
  	         		limit: 10
  	         	}
  	         }
  	       ]
  	     },
         {//配置babel
            test:/\.js$/,
              exclude: /(node_modules)/,
              use: {
                  loader: 'babel-loader',
                  options: {
                      presets: ['env', 'react'],
                      plugins: [["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]]
                  }
              }               
          }
	   	]
 	},
  plugins:[
      new htmlWebpackPlugin({
          template:'./src/index.html',//模板文件
          filename:'index.html',//输出的文件名
          // inject:'head',//脚本写在那个标签里,默认是true(在body结束后)
          hash:true//给生成的js/css文件添加一个唯一的hash
          // chunks:['index']//指定引入的文件，别的不会引入
      }),
      //自动清理无用文件
      new CleanWebpackPlugin()
  ],
  devServer:{
    contentBase: './dist',//内容的目录
    port:9000//服务运行的端口
  }
};