'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount = this.length, ...items) {
    const result = [];
    let from = start;

    if (from === undefined) {
      if (arguments.length) {
        from = 0;
      } else {
        from = this.length;
      }
    }

    if (from < 0 && from >= -this.length) {
      from += this.length;
    } else if (from < -this.length) {
      from = 0;
    }

    const lastPart = this.slice(from);

    this.length -= lastPart.length;

    for (let i = 0; i < deleteCount; i++) {
      if (lastPart[0] || lastPart[0] === 0) {
        result.push(lastPart.shift());
      }
    }

    this.push(...items, ...lastPart);

    return result;
  };
}

module.exports = applyCustomSplice;
