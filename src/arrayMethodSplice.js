'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    let begin = start;
    let deleteItems = deleteCount;

    if (begin === undefined) {
      begin = 0;
      deleteItems = deleteCount - 1;
    }

    if (begin < 0 && Math.abs(begin) > this.length) {
      begin = 0;
    }

    if (begin < 0) {
      begin += this.length;
    }

    if (begin > this.length) {
      begin = this.length;
    }

    let chengeArr = [];
    const leftArr = [];
    const startNewPart = begin + deleteCount;

    if (arguments.length === 0) {
      this.length = this.length;

      return [];
    }

    if (deleteItems === undefined) {
      for (let i = begin; i < this.length; i++) {
        chengeArr.push(this[i]);
      }

      this.length = begin;
    }

    for (let i = startNewPart; i < this.length; i++) {
      leftArr[leftArr.length] = this[i];
    }

    if (deleteItems >= 0) {
      for (let c = begin; c <= deleteItems; c++) {
        chengeArr[chengeArr.length] = this[c];
      }

      if (deleteItems === 0) {
        chengeArr = [];
      }

      this.length = begin;

      if (items.length >= 0) {
        for (let i = 0; i < items.length; i++) {
          this[this.length] = items[i];
        }
      }

      for (let i = 0; i < leftArr.length; i++) {
        this[this.length] = leftArr[i];
      }
    }

    return chengeArr;
  };
}

module.exports = applyCustomSplice;
