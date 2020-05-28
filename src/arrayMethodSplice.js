'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(
    start,
    deleteCount,
    ...items
  ) {
    const secondPart = [];
    const result = [];
    let realStart = start;
    let realCount = this.length - realStart;

    if (start === undefined) {
      return result;
    }

    if (start < 0 && start >= (-this.length)) {
      realStart += this.length;
      realCount = this.length - realStart;
    }

    if (start < (-this.length)) {
      realStart = 0;
      realCount = this.length;
    }

    if (realStart > this.length - 1 || realStart === null) {
      return result;
    }

    if (deleteCount === realCount || deleteCount === undefined) {
      for (let i = realStart; i < this.length; i++) {
        result[result.length] = this[i];
      }
    }

    if (deleteCount > 0 && deleteCount < realCount) {
      for (let i = realStart; i < this.length - deleteCount + 1; i++) {
        result[result.length] = this[i];
      }
    }

    for (let i = realStart + deleteCount; i < this.length; i++) {
      secondPart[secondPart.length] = this[i];
    }

    this.length = realStart;
    if (items !== null) {
      for (let i = 0; i < items.length; i++) {
        this[this.length] = items[i];
      }
    }

    for (let i = 0; i < secondPart.length; i++) {
      this[this.length] = secondPart[i];
    }
    return result;
  };
}
applyCustomSplice();

module.exports = applyCustomSplice;
