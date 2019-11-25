'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    const afterSplice = [];
    const splicedArr = [];
    let newStart = start;

    if (this.length === 0) {
      for (let i = 0; i < items.length; i++) {
        this.push(items[i]);
      }

      return afterSplice;
    }

    if (newStart === undefined) {
      newStart = 0;
    }

    if (arguments.length === 0
      || newStart > this.length - 1
      || deleteCount < 0) {
      return splicedArr;
    }

    if (newStart < 0) {
      newStart = newStart + this.length;

      if (newStart < 0) {
        for (let i = 0; i < this.length; i++) {
          splicedArr[i] = this[i];
        }
        this.length = 0;
        return splicedArr;
      }
    }

    if (deleteCount === undefined) {
      for (let i = newStart; i < this.length; i++) {
        splicedArr.push(i);
      }
    }

    for (let i = newStart; i < newStart + deleteCount; i++) {
      splicedArr.push(i);
    }

    for (let i = 0; i < newStart; i++) {
      afterSplice.push(this[i]);
    }

    if (items.length > 0) {
      for (let i = afterSplice.length, j = 0; i < items.length + 1; i++, j++) {
        afterSplice.push(items[j]);
      }
    }

    for (let i = newStart + deleteCount; i < this.length; i++) {
      afterSplice.push(this[i]);
    }

    this.length = afterSplice.length;

    for (let i = 0; i < afterSplice.length; i++) {
      this[i] = afterSplice[i];
    }

    return splicedArr;
  };
}

module.exports = applyCustomSplice;
