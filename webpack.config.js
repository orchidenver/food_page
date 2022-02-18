'use strict';

let path = require('path');

module.exports = {
  mode: 'production',
  entry: './js/script.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/js'
  },
  watch: true,

  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.m?js$/, // находим js файлы
        exclude: /(node_modules|bower_components)/, // какие папки исключаем
        use: {
          loader: 'babel-loader', // что связываем wp с бабелем
          options: {
            presets: [['@babel/preset-env', { // самый распространенный пресет
                debug: true, // видим полную инфо о дебагах
                corejs: 3, // библиотека полифилов
                useBuiltIns: "usage" // устанавливаем транслит только тех фич, которвые того требуют
            }]]
          }
        }
      }
    ]
  }
};
