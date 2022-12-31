'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    const deleted = [];
    let calculatedStart = start;

    if (arguments.length === 0) {
      return deleted;
    }

    if (start > this.length) {
      calculatedStart = this.length;
    }

    if (start < 0) {
      calculatedStart = this.length + start;
    }

    if (calculatedStart < 0 || calculatedStart === undefined) {
      calculatedStart = 0;
    }

    let deleteIndex = calculatedStart;
    let deleteAmount = deleteCount;

    if (deleteAmount === undefined
      || deleteAmount >= this.length - calculatedStart) {
      deleteAmount = this.length - calculatedStart;
    }

    if (deleteAmount <= 0) {
      deleteAmount = 0;
    }

    while (deleteAmount > 0) {
      deleted.push(this[deleteIndex]);
      deleteIndex++;
      deleteAmount--;
    }

    for (let i = calculatedStart; i < this.length; i++) {
      this[i] = this[i + deleted.length];
    }

    this.length = this.length - deleted.length;

    this.length = this.length + items.length;

    for (let i = this.length - 1; i > calculatedStart; i--) {
      this[i] = this[i - items.length];
    }

    for (let i = calculatedStart; i < calculatedStart + items.length; i++) {
      this[i] = items[i - calculatedStart];
    }

    return deleted;
  };
}

module.exports = applyCustomSplice;
