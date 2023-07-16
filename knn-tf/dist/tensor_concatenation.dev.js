"use strict";

var tf = require('@tensorflow/tfjs-node'); // How to combine tesnors


var data = tf.tensor([[10, 20, 30], [40, 50, 60]]);
var data2 = tf.tensor([[70, 80, 90], [100, 110, 120]]); // 1 helps concat horizontally by row (x axis). 0(default === y axis or column)

var data3 = data.concat(data2, 1);
console.log(data3.arraySync());