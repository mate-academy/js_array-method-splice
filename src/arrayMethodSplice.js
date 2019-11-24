'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount = this.length - start,
    ...items) {
    let iFrom = start;
    let amount = deleteCount;
    const cutEl = [];

    if (arguments.length === 0) {
      return cutEl;
    } else if (iFrom === undefined) {
      iFrom = 0;
    }

    if (iFrom > this.length) {
      iFrom = this.length;
    } else if (iFrom + this.length < 0) {
      iFrom = 0;
    }

    if (iFrom < 0) {
      iFrom += this.length;
    }

    if (amount > this.length - iFrom) {
      amount = this.length - iFrom;
    } else if (amount < 0) {
      amount = 0;
    }

    for (let i = iFrom; i < iFrom + amount; i++) {
      cutEl[cutEl.length] = this[i];
      delete this[i];
    }

    for (let i = iFrom; i < iFrom + amount; i++) {
      this[i] = this[i + amount];
    }
    this.length -= amount;

    if (items.length > 0) {
      const thisCopy = [...this];
      let j = 0;

      for (let i = iFrom; i < iFrom + items.length; i++) {
        this[i] = items[j++];
      }

      j = iFrom;
      for (let i = iFrom + items.length; j < thisCopy.length; i++) {
        this[i] = thisCopy[j++];
      }
    }

    return cutEl;
  };
}

module.exports = applyCustomSplice;
