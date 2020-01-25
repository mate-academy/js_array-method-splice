'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    const result = [];
    let startIndex;
    let deleteActualy;
    const insertCount = items.length ? items.length : 0;

    if (!arguments.length || arguments[0] > this.length || deleteCount < 0) {
      return result;
    }

    if (start >= this.length) {
      startIndex = this.length;
    } else if (start < 0) {
      startIndex = this.length + start > 0 ? this.length + start : 0;
    } else if (!start) {
      startIndex = 0;
    } else {
      startIndex = start;
    }

    if (arguments.length === 1 || deleteCount > this.length - startIndex) {
      deleteActualy = this.length - startIndex;
    } else if (arguments.length > 1 && !deleteCount) {
      deleteActualy = 0;
    } else {
      deleteActualy = deleteCount;
    }

    if (deleteActualy > 0) {
      for (let i = startIndex; i < startIndex + deleteActualy; ++i) {
        result[i - startIndex] = this[i];
      }
    }

    const offset = deleteActualy - insertCount;

    if (offset > 0) {
      for (let i = startIndex + deleteActualy; i < this.length; ++i) {
        this[i - offset] = this[i];
      }
      this.length = this.length - offset;
    }

    if (offset < 0) {
      for (let i = this.length - offset - 1;
        i >= startIndex + insertCount;
        --i
      ) {
        this[i] = this[i + offset];
      }
    }

    for (let i = 0; i < insertCount; ++i) {
      this[startIndex + i] = items[i];
    }

    return result;
  };
}

module.exports = applyCustomSplice;
