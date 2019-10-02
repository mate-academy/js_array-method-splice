'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    if (arguments.length === 0) {
      return [];
    }
    let startIndex = start;
    let deleteCounter = deleteCount;
    if (startIndex === undefined) {
      startIndex = 0;
    }

    if (deleteCounter < 0) {
      deleteCounter = 0;
    }

    const deletedItems = this.slice(startIndex, startIndex + deleteCounter || this.length);
    const existLeft = this.slice(0, startIndex);
    const existRight = this.slice(startIndex + deleteCounter || this.length, this.length);

    this.length = 0;
    const a = [...existLeft, ...items, ...existRight];
    this.push(...a);

    return deletedItems;
  };
}

module.exports = applyCustomSplice;
