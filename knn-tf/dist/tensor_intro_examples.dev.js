"use strict";

var tf = require('@tensorflow/tfjs-node'); // Example 1


var data = tf.tensor([1, 2, 3]);
var otherData = tf.tensor([4, 5, 6]);
var result = data.div(otherData);
console.log(result.arraySync()); // Convert tensor to a JavaScript array [ 0.25, 0.4000000059604645, 0.5 ]
// Example 2

var data2 = tf.tensor([1, 2, 3]);
var otherData2 = tf.tensor([4]);
var result2 = data2.add(otherData2);
console.log(result2.arraySync()); // [5,6,7]
// Example 3

var data3 = tf.tensor([[[1, 2], [3, 4], [5, 6]], [[1, 2], [3, 4], [5, 6]]]);
var otherData3 = tf.tensor([[1], [1], [1]]);
console.log(data3.shape); //[ 2, 3, 2 ]

console.log(otherData3.shape); //[ 3,1 ]

var result3 = data3.add(otherData3); //[ [ [ 2, 3 ], [ 4, 5 ], [ 6, 7 ] ], [ [ 2, 3 ], [ 4, 5 ], [ 6, 7 ] ] ]
// Works because even though 2 in data3 shape is missing counterpart
// the absence of it or if it were 1 or equal to 2, it would work.

result3.print();
var dataa = tf.tensor([1, 1]);
var otherDataa = tf.tensor([1]);
console.log(dataa.shape);
console.log(otherDataa.shape);
var res = dataa.sub(otherDataa);
res.print();
data.print();