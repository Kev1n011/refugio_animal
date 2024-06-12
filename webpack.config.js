const path = require('path');

     module.exports = {
       entry: '/app.js', // Ajusta esto a tu archivo principal de entrada
       output: {
         path: path.resolve(__dirname, 'public'),
         filename: 'bundle.js'
       },
       module: {
         rules: [
           {
             test: /\.(js|jsx)$/,
             exclude: /node_modules/,
             use: {
               loader: 'babel-loader',
               options: {
                 presets: ['@babel/preset-env', '@babel/preset-react']
               }
             }
           },
           {
             test: /\.css$/,
             use: ['style-loader', 'css-loader']
           }
         ]
       },
       resolve: {
         extensions: ['.js', '.jsx']
       },
       devServer: {
         contentBase: path.join(__dirname, 'public'),
         compress: true,
         port: 9000
       }
     };