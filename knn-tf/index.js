const tf = require('@tensorflow/tfjs-node');

// Example 1
const data = tf.tensor([1, 2, 3]);
const otherData = tf.tensor([4, 5, 6]);

const result = data.div(otherData);
console.log(result.arraySync()); // Convert tensor to a JavaScript array [ 0.25, 0.4000000059604645, 0.5 ]

// Example 2
const data2 = tf.tensor([1, 2, 3]);
const otherData2 = tf.tensor([4]);

const result2 = data2.add(otherData2);

console.log(result2.arraySync()); // [5,6,7]
