'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(
    start = 0, deleteCount = this.length, ...items) {
    const resultSplice = [];
    const partAfterDelete = [];
    let deleteFrom = start;
    let deleteNumber = deleteCount;
    if (start < 0) { deleteFrom = start + this.length; }
    if (start > this.length - 1) { deleteFrom = 0; deleteNumber = 0; }
    if (start < 1 - this.length) { deleteFrom = 0; }
    if (arguments.length === 0) { deleteFrom = this.length; }
    if (deleteCount < 0) { deleteNumber = 0; }

    for (let i = 0; i < this.length; i++) {
      if (i >= deleteFrom && i < deleteFrom + deleteNumber) {
        resultSplice.push(this[i]);
      } else if (i >= deleteFrom + deleteNumber) {
        partAfterDelete.push(this[i]);
      }
    }
    this.length = deleteFrom;
    this.push(...items, ...partAfterDelete);

    return resultSplice;
  };
}

module.exports = applyCustomSplice;
