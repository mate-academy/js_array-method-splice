'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    // write code here
    if (arguments.length === 0) {
      return [];
    }

    let index = start;
    let copyDeleteCount = deleteCount;
    const itemLength = this.length;
    const copy = [...this];
    const addParameters = [...items];
    const sliceItem = [];

    if (index < 0) {
      index += this.length;
    }

    if (index < 0 || index === undefined) {
      index = 0;
    }

    if (copyDeleteCount < 0) {
      copyDeleteCount = 0;
    }

    if (copyDeleteCount === undefined) {
      for (let i = index; itemLength > i; i++) {
        sliceItem[i - index] = this[i];
      }

      for (let i = 0; itemLength - index > i; i++) {
        this.length--;
      }
    } else {
      for (let i = index; index + copyDeleteCount > i; i++) {
        sliceItem[i - index] = this[i];
      }

      this.length = index;

      for (let i = index + copyDeleteCount; copy.length > i; i++) {
        this[this.length] = copy[i];
      }
    }

    if (addParameters.length > 0) {
      this.length = index;

      for (let i = 0; addParameters.length > i; i++) {
        this[this.length] = addParameters[i];
      }

      for (let i = index + copyDeleteCount; copy.length > i; i++) {
        this[this.length] = copy[i];
      }
    }

    return sliceItem;
  };
}

module.exports = applyCustomSplice;
