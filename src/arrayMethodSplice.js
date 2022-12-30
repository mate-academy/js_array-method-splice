'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    let startPoint = start;
    let endPoint = deleteCount;
    const newArray = [];

    if ((startPoint === undefined && endPoint === undefined)
      || startPoint > this.length
      || endPoint < 0) {
      return newArray;
    }

    if (startPoint + this.length < 0 || startPoint === undefined) {
      startPoint = 0;
    }

    if (startPoint < 0) {
      startPoint = this.length + startPoint;
    }

    if (Number.isInteger(startPoint) && endPoint === undefined) {
      endPoint = this.length;

      for (let i = startPoint; i < endPoint; i++) {
        newArray[i - startPoint] = this[i];
      }

      this.length = startPoint;

      return newArray;
    }

    for (let i = 0; i < endPoint; i++) {
      newArray[i] = this[i + startPoint];
    }

    if (!items.length) {
      for (let i = 0; i < this.length - (startPoint + endPoint); i++) {
        this[startPoint + i] = this[startPoint + endPoint + i];
      }

      this.length -= endPoint;

      return newArray;
    }

    const endOfArray = [];

    for (let i = startPoint + endPoint; i < this.length; i++) {
      endOfArray[i - (startPoint + endPoint)] = this[i];
    }

    this.length = startPoint;

    for (let i = 0; i < items.length; i++) {
      this[this.length] = items[i];
    }

    for (let i = 0; i < endOfArray.length; i++) {
      this[this.length] = endOfArray[i];
    }

    return newArray;
  };
}

module.exports = applyCustomSplice;
