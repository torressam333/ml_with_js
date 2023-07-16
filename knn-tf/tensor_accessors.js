const tf = require('@tensorflow/tfjs-node');

const data = tf.tensor([
  [10, 20, 30],
  [100, 200, 300],
  [100, 40, 300],
  [100, 50, 300],
  [100, 60, 300],
  [100, 70, 300],
  [100, 80, 300],
]);

const data2 = tf.tensor([10, 20, 30]);

// Access single element
console.log(data.arraySync()[1][2]); // 300
console.log(data2.arraySync()[1]); // 20

// Access many elements in a tensor

/**
 * Grab only 2nd col from data
 * 
 * slice() breakdown
 * 1. [0,1] is a starting point of where to pull values from.
 * in this case using data tensor [0,1] === to the 20 in the 2nd column
     [0]  [1] [2]
  0: [10, 20, 30],
  1: [100, 200, 300],
  2: [100, 40, 300],

  2. The [-1, 1]. -1 spot represents the #of rows to be included in the
      calculation. -1 is a special number in tfjs which means return ALL rows count.
      The second index of "1" represents how many columns wide you want to span. We use just "1" because we only want the 2nd column. If I wanted the 2nd and 3rd columns, i'd type 2. Which would return this: [
      [ 20, 30 ],
      [ 200, 300 ],
      [ 40, 300 ],
      [ 50, 300 ],
      [ 60, 300 ],
      [ 70, 300 ],
      [ 80, 300 ]
]
 */
const secondCol = data.slice([0, 1], [-1, 2]);
console.log(secondCol.arraySync());
