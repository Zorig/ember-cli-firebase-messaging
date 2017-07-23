/* eslint-env node */
'use strict';

var path = require('path');
var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var fbTransform = require('fastboot-transform');

module.exports = {
  name: 'ember-cli-firebase-messaging',
   included() {
    this._super.included.apply(this, arguments);
    this.import('vendor/firebase-app.js');
    this.import('vendor/firebase-messaging.js');
  },
  treeForVendor(vendorTree) {
    this._super.treeForVendor.apply(this, arguments);
    var trees = [];
    var modulePath = path.dirname(require.resolve('firebase'));

    if (vendorTree) {
      trees.push(vendorTree);
    }

    trees.push(
      fbTransform(new Funnel(modulePath))
    );
    return mergeTrees(trees);
  },
};
