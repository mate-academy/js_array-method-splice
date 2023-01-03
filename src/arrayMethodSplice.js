'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start = 0, deleteCount = 0, ...items) {
    const deletedArgs = [];
    const rest = [];
    let startIndex = start;
    let delCount = deleteCount;

    if (startIndex > this.length) {
      startIndex = this.length;
    }

    if (startIndex < -this.length) {
      startIndex = 0;
    }

    if (startIndex < 0) {
      startIndex += this.length;
    }

    if (delCount <= 0) {
      delCount = 0;
    }

    if (arguments.length === 1) {
      delCount = this.length - startIndex;
    }

    const endIndex = startIndex + delCount;

    for (let i = startIndex; i < endIndex; i++) {
      deletedArgs[deletedArgs.length] = this[i];
    }

    for (let j = endIndex; j < this.length; j++) {
      rest[rest.length] = this[j];
    }

    this.length = startIndex;

    for (const item of items) {
      this[this.length] = item;
    }

    for (const item of rest) {
      this[this.length] = item;
    }

    return deletedArgs;
  };
}

module.exports = applyCustomSplice;
