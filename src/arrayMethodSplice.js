'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    const res = [];
    const splice = [];
    if (arguments.length === 0
      || (deleteCount < 0)
      || ((start >= this.length) && start !== 0)) {
      return splice;
    }

    let newStart = start;
    if ((newStart === undefined) || (newStart < -this.length)) {
      newStart = 0;
    }
    if (newStart < 0) {
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
