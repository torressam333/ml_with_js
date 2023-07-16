const tf = require('@tensorflow/tfjs-node');

const data = tf.tensor([
  [10, 20, 30],
  [100, 200, 300],
  [100, 40, 300],
  [100, 50, 300],
  [100, 60, 300],
  [100, 70, 300],
  [100, 80, 300],
]);

const data2 = tf.tensor([10, 20, 30]);

// Access single element
console.log(data.arraySync()[1][2]); // 300
console.log(data2.arraySync()[1]); // 20

// Access many elements in a tensor

// Grab only 2nd col from data
const secondCol = data.slice([0, 1], [7, 1]);
console.log(secondCol.arraySync());
