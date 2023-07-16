"use strict";

var tf = require('@tensorflow/tfjs-node'); // How to combine tesnors


var data = tf.tensor([[10, 20, 30], [40, 50, 60]]);
var data2 = tf.tensor([[70, 80, 90], [100, 110, 120]]);
var data3 = data.concat(data2);
console.log(data3.arraySync());