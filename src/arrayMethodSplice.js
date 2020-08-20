'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start = 0, deleteCount, ...items) {
    if (arguments.length < 1) {
      return [];
    }

    const deleted = [];
    let saved = [];
    let changeFrom = start;
    let deleteN = deleteCount;

    if (changeFrom > this.length) {
      changeFrom = this.length;
    }

    if (changeFrom < 0) {
      changeFrom += this.length;
    }

    if (changeFrom < 0) {
      changeFrom = 0;
    }

    if (deleteN === undefined || deleteN >= this.length - changeFrom) {
      deleteN = this.length - changeFrom;
    }

    if (deleteN < 0) {
      deleteN = 0;
    }

    for (let i = 0; i < changeFrom; i++) {
      saved[saved.length] = this[i];
    }

    if (items.length > 0) {
      saved = [...saved, ...items];
    }

    for (let i = changeFrom; i < changeFrom + deleteN; i++) {
      deleted[deleted.length] = this[i];
    }

    for (let i = changeFrom + deleteN; i < this.length; i++) {
      saved[saved.length] = this[i];
    }

    for (let i = changeFrom; i < saved.length; i++) {
      this[i] = saved[i];
    }

    this.length = saved.length;

    return deleted;
  };
}

module.exports = applyCustomSplice;
