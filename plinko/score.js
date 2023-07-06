// Main data store for ball drop data
const outputs = [];
// Arbitrary point used for this expirimentation
const predictionPoint = 300;
// Arbitrary value for k, can be anything.
const k = 3;

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  // Store ball drop data per each drop in 2d-array
  outputs.push([dropPosition, bounciness, size, bucketLabel]);
}

function runAnalysis() {
  console.log('analyzing...');
  // K-nearest-neighbor algorithm using lodash to get most likel bucket #
  const bucket = _.chain(outputs)
    .map((row) => [distance(row[0]), row[3]])
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
    .value();

  console.log('Your point will probably fall into bucket #' + bucket);
}

// Helper fn to do step 1 of knn (sub drop point from 300 as abs value)
function distance(point) {
  return Math.abs(point - predictionPoint);
}

// Use to split data in 'training' set and 'test' set
function splitDataSets(data, testCount) {
  // Shuffle data to make it more randomized (less bias)
  const shuffled = _.shuffle(data);

  // Split data
  const testSet = _.slice(shuffled, 0, testCount);
  const trainingSet = _.slice(shuffled, testCount);

  return [testSet, trainingSet];
}
