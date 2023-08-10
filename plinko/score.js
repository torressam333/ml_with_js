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
  // Make predictions for 10 separate data points === [1,4,16,2]
  const testSetSize = 100;
  const k = 10;

  // Use lodash range method to test varying values for K
  // feature === 0 then 1 then 2, range excludes 3.
  _.range(0, 3).forEach((feature) => {
    // Return 2D array with features we want included (dropPosition...)
    const data = _.map(outputs, (row) => [row[feature], _.last(row)]);
    const [testSet, trainingSet] = splitDataSets(minMax(data, 1), testSetSize);

    // Does bucket prediction from runKNN === bucketLabel?
    const accuracy = _.chain(testSet)
      .filter(
        (testPoint) =>
          runKNN(trainingSet, _.initial(testPoint), k) === _.last(testPoint)
      )
      .size()
      .divide(testSetSize)
      .value();

    console.log(
      `You're prediction accuracy is ${Math.round(
        accuracy * 100
      )}% with ${feature}`
    );
  });
}

// Use pythag theorum to work with any # of features
function distance(pointA, pointB) {
  /**
   * _.chain(pointA): Creates a lodash chain using pointA as the starting point.
   * .zip(pointB): Zips the elements of pointA and pointB together, resulting in an array of pairs: [[1, 4], [1, 5]].
   * .map(([a, b]) => (a - b) ** 2): Maps over each pair of elements, subtracts the second element from the first element, and squares the result. In this case, the mapping would be [(1 - 4)^2, (1 - 5)^2], resulting in [9, 16].
   * .sum(): Computes the sum of the mapped values. In this case, the sum is 9 + 16 = 25.
   * .value() ** 0.5: Retrieves the final result of the chain and calculates its square root. In this case, the square root of 25 is 5.
   * Therefore, when the points pointA = [1, 1] and pointB = [4, 5] are used in the given code, the result will be 5.
   */
  return (
    _.chain(pointA)
      .zip(pointB)
      .map(([a, b]) => (a - b) ** 2)
      .sum()
      .value() ** 0.5
  );
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
  // point has three values
  // K-nearest-neighbor algorithm using lodash to get most likel bucket #
  return (
    _.chain(data)
      .map((row) => {
        return [distance(_.initial(row), point), _.last(row)];
      })
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

/**
 *
 * @param {*} data
 * @param {*} featureCount
 * @returns
 */
function minMax(data, featureCount) {
  // Clone data to ensure no mutation happens
  const clonedData = _.cloneDeep(data);

  // (first iterate over columns)
  for (let i = 0; i < featureCount; i++) {
    // Grab dropPosition as an arr of numbers
    const column = clonedData.map((row) => row[i]);

    // Find min and max values
    const min = _.min(column);
    const max = _.max(column);

    // Iterate over every row and modify in place
    for (let j = 0; j < clonedData.length; j++) {
      // Normalize data (update data in place)
      clonedData[j][i] = (clonedData[j][i] - min) / (max - min);
    }
  }

  return clonedData;
}
