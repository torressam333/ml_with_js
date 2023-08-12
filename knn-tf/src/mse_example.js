const mseHistory = [];

for (let b = 0; b < 500; b++) {
  mseHistory.push({ b, mse: mse(b) });
}

// Find lowest value of mse that must be correct value of b
const goodGuessForB = _.min(mseHistory);
