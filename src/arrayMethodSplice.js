'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    let startIndex = start;
    let delCount = deleteCount;

    if (arguments.length === 0) {
      return [];
    };

    if (delCount === undefined) {
      delCount = this.length - startIndex;
    };

    if (startIndex === undefined) {
      startIndex = 0;
    };

    if (startIndex < -this.length) {
      startIndex = startIndex % this.length;
    };

    if (startIndex < 0) {
      startIndex = this.length + startIndex;
    };

    if (startIndex >= this.length) {
      startIndex = startIndex % this.length;
    };

    const startArr = [];
    const endArr = [];
    const splicedArr = [];

    for (let i = 0; i < startIndex; i++) {
      startArr.push(this[i]);
    };

    for (let i = startIndex; i < this.length; i++) {
      if (i < startIndex + delCount) {
        splicedArr.push(this[i]);
      } else {
        endArr.push(this[i]);
      };
    };

    this.length = 0;

    for (let i = 0; i < startArr.length; i++) {
      this.push(startArr[i]);
    };

    for (let i = 0; i < items.length; i++) {
      this.push(items[i]);
    };

    for (let i = 0; i < endArr.length; i++) {
      this.push(endArr[i]);
    };

    return splicedArr;
  };
}

module.exports = applyCustomSplice;
