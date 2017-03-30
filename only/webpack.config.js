module.exports = {
    entry:'./app.js',
    // 输出配置
    output: {
        // 输出路径是 myProject/output/static
        path: __dirname+'/build',
        publicPath:"build/",
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            // 使用vue-loader 加载 .vue 结尾的文件
            {
                test: /\.vue$/, 
                loader: 'vue-loader'
            }
        ]
    },
    devServer:{
    	host:"0.0.0.0"
    }
}