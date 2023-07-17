"use strict";

var tf = require('@tensorflow/tfjs-node');

var jumpData = tf.tensor([[70, 70, 70], [70, 70, 70], [70, 70, 70], [70, 70, 70]]);
var playerData = tf.tensor([[1, 60], [2, 60], [3, 60], [4, 60]]);
/**
 * One way to sum and concat vertically to prevent
 * sum() from changing 2d tensor into a 1d tensor.
 * 
 * Using true prevents tensor comaction but it only works
 * for the sum method and is not versatile enough but this
 * is a good way to know:
 * 
 *
 *  // Sum up values in jump data along x axis
    const sum = jumpData.sum(1, true);

    // Concat on player data (along columns not rows)
    const concatedSum = sum.concat(playerData, 1);

    sum.print();
    concatedSum.print();
 */

/**
 * This is a 2nd and more versatile method of sum/contatenating
 * values that will work beyond just the sum() function w/o using sum(1, true)
 */

var sum = jumpData.sum(1);
var expandSum = sum.expandDims(1);
sum.print();