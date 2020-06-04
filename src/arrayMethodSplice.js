'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(
    start = 0, deleteCount, ...items) {
    if (arguments.length === 0) {
      return [];
    }

    const spliced = [];
    let startIndex = start;
    let endIndex;

    if (startIndex < 0) {
      startIndex += this.length;

      if (startIndex < 0) {
        startIndex = 0;
      }
    } else if (startIndex > this.length) {
      startIndex = this.length;
    }

    if (deleteCount < 0) {
      return spliced;
    } else if (deleteCount >= this.length || deleteCount === undefined) {
      endIndex = this.length;
    } else {
      endIndex = startIndex + deleteCount;
    }

    if (deleteCount !== undefined || arguments.length <= 1) {
      for (let i = startIndex; i < this.length; i++) {
        if (i < endIndex) {
          spliced.push(this[i]);
        }

        this[i] = this[i + deleteCount];
      }

      this.length -= spliced.length;
    }

    if (items.length > 0) {
      this.length += items.length;

      for (let i = this.length - 1; i >= startIndex; i--) {
        if (i >= items.length + startIndex) {
          this[i] = this[i - items.length];
        } else {
          this[i] = items[i - startIndex];
        }
      }
    }

    return spliced;
  };
}

module.exports = applyCustomSplice;
