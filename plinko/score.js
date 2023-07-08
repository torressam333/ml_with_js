// Main data store for ball drop data
const outputs = [];
// Arbitrary point used for this expirimentation
const predictionPoint = 300;

/**
 *
 * @param {*} dropPosition
 * @param {*} bounciness
 * @param {*} size
 * @param {*} bucketLabel
 */
function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  // Store ball drop data per each drop in 2d-array
  outputs.push([dropPosition, bounciness, size, bucketLabel]);
}

function runAnalysis() {
  console.log('analyzing...');
  // Make predictions for 10 separate data points
  const testSetSize = 10;
  const [testSet, trainingSet] = splitDataSets(outputs, testSetSize);

  // Use lodash range method to test varying values for K
  _.range(1, 15).forEach((k) => {
    // Does bucket prediction from runKNN === bucketLabel?
    const accuracy = _.chain(testSet)
      .filter(
        (testPoint) => runKNN(trainingSet, testPoint[0], k) === testPoint[3]
      )
      .size()
      .divide(testSetSize)
      .value();

    console.log(`You're prediction accuracy is ${accuracy * 100}%`);
  });
}

// Helper fn to do step 1 of knn (sub drop point from x as abs value)
function distance(pointA, pointB) {
  return Math.abs(pointA - pointB);
}

/**
 *
 * @param {*} data
 * @param {*} testCount
 * @returns
 *
 * Use to split data in 'training' set and 'test' set
 */
function splitDataSets(data, testCount) {
  // Shuffle data to make it more randomized (less bias)
  const shuffled = _.shuffle(data);

  // Split data
  const testSet = _.slice(shuffled, 0, testCount);
  const trainingSet = _.slice(shuffled, testCount);

  return [testSet, trainingSet];
}

/**
 *
 * @param {*} data
 * @param {*} point
 * @returns
 */
function runKNN(data, point, k) {
  // K-nearest-neighbor algorithm using lodash to get most likel bucket #
  return (
    _.chain(data)
      .map((row) => [distance(row[0], point), row[3]])
      // Sort by ball drop point distance from prediction point
      .sortBy((row) => row[0])
      // take top k results
      .slice(0, k)
      // get frequency (# of records) using bucket;
      .countBy((row) => row[1])
      // Convert ratio object to 2d array: i.e. [[4,2], 1,1]
      .toPairs()
      // Sort by 2nd elem as criteria
      .sortBy((row) => row[1]) // [[1,1], [4,2]]
      // Last inner array in 2d array is most probable target: [4,2]
      .last()
      // Grab bucket number from [4,2] === "4"
      .first()
      // Convert "4" to 4
      .parseInt()
      // Term chain and return value
      .value()
  );
}
