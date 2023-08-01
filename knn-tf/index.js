require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfs');
const loadCSV = require('./load-csv');

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
