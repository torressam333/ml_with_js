"use strict";

var tf = require('@tensorflow/tfjs-node');

var data = tf.tensor([[10, 20, 30], [100, 200, 300]]);
var data2 = tf.tensor([10, 20, 30]); // Access single element

console.log(data.arraySync()[1][2]); // 300

console.log(data2.arraySync()[1]); // 20