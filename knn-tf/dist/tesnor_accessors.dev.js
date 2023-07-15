"use strict";

var tf = require('@tensorflow/tfjs-node');

var data = tf.tensor([10, 20, 30]); // Access single element

data.get(0);