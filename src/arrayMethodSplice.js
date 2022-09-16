'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start = 0, deleteCount, ...items) {
    if (arguments.length === 0) {
      return [];
    }

    const arrbefore = [];
    let arrRemoved = [];
    let arrAfter = [];
    let from = start;
    let countOfDelete = deleteCount;

    if (deleteCount < 0) {
      countOfDelete = 0;
    }

    if (deleteCount < 0 && !items.length) {
      return arrRemoved;
    }

    if (start > this.length) {
      from = this.length;
    }

    if (start < 0) {
      from += this.length;
    }

    if (from < 0) {
      from = 0;
    }

    if (this.length - deleteCount - from < 0) {
      countOfDelete = this.length - from;
    }

    for (let i = 0; i < from; i++) {
      arrbefore[arrbefore.length] = this[i];
    }

    if (!deleteCount && !items.length) {
      for (let i = from; i < this.length; i++) {
        arrRemoved[arrRemoved.length] = this[i];
      }
    }

    if (deleteCount === 0) {
      arrRemoved = [];
    }

    if ((countOfDelete > 0 && start < this.length) || !items.length) {
      for (let i = from; i < from + countOfDelete; i++) {
        arrRemoved[arrRemoved.length] = this[i];
      }
    }

    if (items.length) {
      arrAfter = [...items];
    }

    for (let i = from + countOfDelete; i < this.length; i++) {
      arrAfter[arrAfter.length] = this[i];
    }

    this.length = arrbefore.length + arrAfter.length;

    for (let i = 0; i < arrbefore.length; i++) {
      this[i] = arrbefore[i];
    }

    for (let i = arrAfter.length - 1; i >= 0; i--) {
      this[arrbefore.length + i] = arrAfter[i];
    }

    return arrRemoved;
  };
};

module.exports = applyCustomSplice;
