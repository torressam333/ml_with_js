// Main data store for ball drop data
const outputs = [];

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  // Store ball drop data per each drop in 2d-array
  outputs.push([dropPosition, bounciness, size, bucketLabel]);

  console.log(outputs);
}

function runAnalysis() {
  // Write code here to analyze stuff
  console.log('analyzing...');
}
