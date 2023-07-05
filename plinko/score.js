// Main data store for ball drop data
const outputs = [];
// Arbitrary point used for this expirimentation
const predictionPoint = 300;
// Arbitrary value for k, can be anything.
const k = 3;

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  // Store ball drop data per each drop in 2d-array
  outputs.push([dropPosition, bounciness, size, bucketLabel]);

  // Map over res and use dropPosition and bucketLabel only
  _.chain(outputs)
    .map((row) => [distance(row[0]), row[3]])
    .sortBy((row) => row[0])
    .slice(0, k); // take top k results
}

function runAnalysis() {
  // Write code here to analyze stuff
  console.log('analyzing...');
}

// Helper fn to do step 1 of knn (sub drop point from 300 as abs value)
function distance(point) {
  return Math.abs(point - predictionPoint);
}
