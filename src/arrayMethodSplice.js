'use strict';

/**
 * Implement method Splice
 */

function applyCustomSplice() {
  [].__proto__.splice2 = function(start = 0, deleteCount = 0, ...items) {
    const result = [];
    const array = [];
    let count = 0;
    let from = start;
    let del = deleteCount;

    if (from < 0) {
      from += this.length;
    }

    if (from < 0) {
      from = 0;
    }

    if (arguments.length === 1) {
      del = this.length - from;
    }

    if (this.length === 0) {
      for (let i = 0; i < items.length; i++) {
        this[this.length] = items[i];
      }

      return result;
    }

    if (del === undefined) {
      for (let i = from; i < this.length; i++) {
        result[i - from] = this[i];
      }
    }

    if (del > 0) {
      for (let i = from; i < from + del; i++) {
        result[i - from] = this[i];
      }
    }

    for (let i = 0; i < this.length; i++) {
      if (!result.includes2(this[i])) {
        array[count] = this[i];
        count++;

        if (count === from) {
          for (let j = 0; j < items.length; j++) {
            array[count] = items[j];
            count++;
          }
        }
      }
    }

    this.length = array.length;

    for (let i = 0; i < array.length; i++) {
      this[i] = array[i];
    }

    return result;
  };

  [].__proto__.includes2 = function(value, start2 = 0) {
    let index = start2;

    if (index < 0) {
      index += this.length;
    }

    if (index < 0) {
      index = 0;
    }

    for (let i = index; i < this.length; i++) {
      if (this[i] === value) {
        return true;
      }
    }

    return false;
  };
}

module.exports = applyCustomSplice;
