const path = require('path')  // 引入一个包
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

// webpack中的所有配置信息都应该放入module.exports中
module.exports = {
          entry:"./src/index.ts",      // 指定文件入口
          output:{
              // 指定打包文件的目录
              path:path.resolve(__dirname,'dist'),
              // 指定打包后的文件
              filename:"bundle.js"
          },
          "mode":"development", //不加的话启动的时候会报错，百度找的
         // 指定webpack打包时要使用的模块，scss，ts等
         module:{
              // 指定要加载的规则
             rules:[
                  {
                     test:/\.ts$/,        // test指定符合规则的文件
                     use:'ts-loader',  //用ts-loader去处理ts文件
                     exclude:/node_module/,  //要排除的文件，路径有这个名就不
                                                                      // 进行编译
                   },
                   {
                    test:/\.less$/,    //规则，已less结尾
                    use:[
                         "style-loader",
                         "css-loader",
                         {  
                              loader:'postcss-loader',     
                              options:{  // 这里固定写法 ,进行配置
                                   postcssOptions:{
                                        plugins:[  //填写要使用的插件
                                        [          // 具体的插件 
                                             "postcss-preset-env",
                                                  {
                                                       browsers:'last 2 versions'  //最新 2个 最新版本的浏览器
                                                       // 兼容那些浏览器：last 最新 2个 最新版本的浏览器
                                                  }
                                             ] 
                                        ]
                                   }
                              }
                         },
                         "less-loader"
                    ]
                   }
              ]
         },
         plugins:[
            // new HTMLWebpackPlugin(),   // 这就是自动生成html文件的配置
           new HTMLWebpackPlugin({
                 title:"贪吃蛇",    // 如果需要自己配置title，需要在这函数内
                 template:'./src/index.html'
            }),
            new CleanWebpackPlugin(),
        ],
        resolve:{
            extensions:[ '.ts' , '.js' ]    // 表示把ts或者js结尾的文件当引入文件
         }
}