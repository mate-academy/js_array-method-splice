'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    const res = [];
    const splice = [];
    if (arguments.length === 0
      || ((start > this.length) && start !== 0)
      || (deleteCount < 0)) {
      return splice;
    }

    if (start < -this.length) {
      for (let i = 0; i < this.length; i++) {
        splice[i] = this[i];
      }
      this.length = 0;
      return splice;
    }

    let newStart = start;
    if (start === undefined) {
      newStart = 0;
    }
    if (start < 0) {
      newStart = this.length + start;
    }

    if (deleteCount === undefined) {
      for (let i = newStart; i < this.length; i++) {
        splice[splice.length] = this[i];
      }
      this.length = newStart;
      return splice;
    }

    for (let i = newStart; i < newStart + deleteCount; i++) {
      splice[splice.length] = this[i];
    }
    for (let i = 0; i < newStart; i++) {
      res[res.length] = this[i];
    }
    for (let i = 0; i < items.length; i++) {
      res[res.length] = items[i];
    }
    for (let i = newStart + deleteCount; i < this.length; i++) {
      res[res.length] = this[i];
    }

    for (let i = 0; i < res.length; i++) {
      this[i] = res[i];
    }
    this.length = res.length;
    return splice;
  };
}

module.exports = applyCustomSplice;
