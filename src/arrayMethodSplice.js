'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start = 0, deleteCount, ...items) {
    let startFrom = start;

    if (startFrom < 0 && Math.abs(startFrom) > this.length) {
      startFrom = 0;
    }

    if (startFrom < 0) {
      startFrom += this.length;
    }

    if (startFrom > this.length) {
      startFrom = this.length;
    }

    let changedArr = [];
    const secondNotChangedPart = [];
    const startOfNewPart = startFrom + deleteCount;

    if (!arguments.length) {
      return [];
    }

    if (deleteCount === undefined) {
      for (let i = startFrom; i < this.length; i++) {
        changedArr.push(this[i]);
      }

      this.length = startFrom;
    }

    for (let i = startOfNewPart; i < this.length; i++) {
      secondNotChangedPart[secondNotChangedPart.length] = this[i];
    }

    if (deleteCount >= 0) {
      for (let i = startFrom; i < startOfNewPart; i++) {
        changedArr[changedArr.length] = this[i];
      }

      if (deleteCount === 0) {
        changedArr = [];
      }

      this.length = startFrom;

      if (items.length >= 0) {
        for (let i = 0; i < items.length; i++) {
          this[this.length] = items[i];
        }
      }

      for (let i = 0; i < secondNotChangedPart.length; i++) {
        this[this.length] = secondNotChangedPart[i];
      }
    }

    return changedArr;
  };
}

module.exports = applyCustomSplice;
