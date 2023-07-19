"use strict";

var tf = require('@tensorflow/tfjs-node');
/**
 * Features order and labels order are in sync ([-124,47]) will
 * line up with the label of [200] etc...
 */
// Fake sample data for housing info (long/lat for houses)


var features = tf.tensor([[-121, 47], [-121.2, 46.5], [-122, 46.4], [-120.9, 46.7]]); // Collection of labels (property values for houses)

var labels = tf.tensor([[200], [250], [215], [240]]); // Create prediction: point trying to calculate prop value for

var predictionPoint = tf.tensor([-121, 47]);
var calculatedFeatures = features.sub(predictionPoint).pow(2).sum(1).pow(0.5);
console.log(calculatedFeatures.arraySync());