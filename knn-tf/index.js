const tf = require('@tensorflow/tfjs-node');

const data = tf.tensor([1, 2, 3]);

const otherData = tf.tensor([4, 5, 6]);

data.div(otherData);

// console.log('shape:', data.shape);
// console.log('Sub:', data.sub(otherData));
console.log('Div:', data);
