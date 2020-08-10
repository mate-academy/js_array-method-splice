'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start = 0, deleteCount, ...items) {
    if (arguments.length === 0) {
      return [];
    }

    let startIndex = start;

    if (start < 0) {
      startIndex += this.length;

      if (startIndex < 0) {
        startIndex = 0;
      };
    }

    if (startIndex > this.length) {
      startIndex = this.length;
    };

    let endIndex = deleteCount;

    if (endIndex === undefined
      || endIndex >= this.length - startIndex) {
      endIndex = this.length - startIndex;
    };

    if (endIndex < 0) {
      endIndex = 0;
    };

    const result = [];
    let cache = [];

    for (let i = startIndex; i < startIndex + endIndex; i++) {
      result[result.length] = this[i];
    };

    for (let i = 0; i < startIndex; i++) {
      cache[cache.length] = this[i];
    };

    cache = [...cache, ...items];

    for (let i = startIndex + endIndex; i < this.length; i++) {
      cache[cache.length] = this[i];
    };

    for (let i = 0; i < cache.length; i++) {
      this[i] = cache[i];
    };

    this.length = cache.length;

    return result;
  };
}

module.exports = applyCustomSplice;
