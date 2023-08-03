const tf = require('@tensorflow/tfjs-node');
const loadCSV = require('./load-csv');

const knn = (features, labels, predictionPoint, k) => {
  // Formula: sq-root[(lat - lat)^2 + (long - long)^2] (pythag theorem)
  const calculatedFeatures = features
    .sub(predictionPoint)
    .pow(2)
    .sum(1)
    .pow(0.5);

  // Concat distances and labels (keep indices aligned for sorting) = 2D tensor
  const concatFeatures = calculatedFeatures.expandDims(1).concat(labels, 1);

  // (JS array of tensors)
  const unstackedFeatures = concatFeatures.unstack();
  // Sorted array using arraySync to grab data from tensor by index
  const sortedFeatures = unstackedFeatures.sort((a, b) =>
    a.arraySync()[0] > b.arraySync()[0] ? 1 : -1
  );

  // Average top values after sorting (reduce/avg by labels values)
  const avgValues =
    sortedFeatures
      .slice(0, k)
      .reduce((acc, pair) => acc + pair.arraySync()[1], 0) / k;

  return avgValues;
};

// Returns object
let { features, labels, testFeatures, testLabels } = loadCSV(
  'kc_house_data.csv',
  {
    // Shuffle rows of data in csv
    shuffle: true,
    // #of records creating 2 sets of data (1. Training 2. Testing) purposes
    splitTest: 10,
    // Which cols from data to test against
    dataColumns: ['lat', 'long'],
    // Which col we want as our label (i.e. using lat + long to determine price)
    labelColumns: ['price'],
  }
);

features = tf.tensor(features);
labels = tf.tensor(labels);

// Loop through all rows and provide predictions across multiple test samples
testFeatures.forEach((testPoint, index) => {
  const result = knn(features, labels, tf.tensor(testPoint), 10);
  const marginOfError = (testLabels[index][0] - result) / testLabels[index][0];

  console.log('GUESS: ', result, testLabels[index][0]);
  console.log('Margin of error: ', marginOfError * 100);
});
