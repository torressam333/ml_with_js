const tf = require('@tensorflow/tfjs-node');

/**
 * Features order and labels order are in sync ([-124,47]) will
 * line up with the label of [200] etc...
 */
// Fake sample data for housing info (long/lat for houses)
const features = tf.tensor([
  [-121, 47],
  [-121.2, 46.5],
  [-122, 46.4],
  [-120.9, 46.7],
]);

const k = 2;

// Collection of labels (property values for houses)
const labels = tf.tensor([[200], [250], [215], [240]]);

// Create prediction: point trying to calculate prop value for
const predictionPoint = tf.tensor([-121, 47]);

// Formula: sq-root[(lat - lat)^2 + (long - long)^2] (pythag theorem)
const calculatedFeatures = features.sub(predictionPoint).pow(2).sum(1).pow(0.5);

// Concat distances and labels (keep indices aligned for sorting) = 2D tensor
const concatFeatures = calculatedFeatures.expandDims(1).concat(labels, 1);

// (JS array of tensors)
const unstackedFeatures = concatFeatures.unstack();
// Sorted array using arraySync to grab data from tensor by index
const sortedFeatures = unstackedFeatures.sort((a, b) =>
  a.arraySync()[0] > b.arraySync()[0] ? 1 : -1
);

// Average top values after sorting
const avgValues = sortedFeatures.slice(0, k);

// Take top K records (least -> great)
// console.log(concatFeatures.arraySync());
console.log(sortedFeatures[2].arraySync());
