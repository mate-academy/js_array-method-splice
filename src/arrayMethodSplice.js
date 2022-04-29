/* eslint-disable max-len */
'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start = 0, deleteCount = this.length, ...items) {
    // write code here
    const result = [];
    let starter = start;
    const deleter = deleteCount;
    let count = 0;

    if ((start === undefined) || (starter < -10)) {
      starter = 0;
    } else if (starter < 0) {
      starter += this.length;
    }

    if (arguments.length === 0) {
      return [];
    }

    if (starter === 0) {
      for (let i = starter; i < deleter; i++) {
        result[count] = this[i];
        delete this[i];
        count++;
      }
    } else {
      for (let i = starter; i <= deleter; i++) {
        result[count] = this[i];
        delete this[i];
        count++;
      }
    }

    let len = this.length;

    len -= 1;
    count = 0;

    let undefCount = 0;

    for (let i = 0; i <= len; i++) {
      if (this[i] !== undefined) {
        this[count] = this[i];
        count++;
      } else {
        undefCount++;
      }
    }
    this.length -= undefCount;

    count = 0;
    undefCount = 0;

    for (let i = 0; i < result.length; i++) {
      if (result[i] !== undefined) {
        result[count] = result[i];
        count++;
      } else {
        undefCount++;
      }
    }
    result.length -= undefCount;

    const argsLen = arguments.length - 2;

    if (arguments.length > 2) {
      count = 2;

      if (starter === 0) {
        for (let i = starter; i < argsLen; i++) {
          if (this[i] !== undefined) {
            this[i + argsLen] = this[i];
            this[i] = arguments[count];
            count++;
          } else {
            this[i] = arguments[count];
            count++;
          }
        }
      } else {
        for (let i = starter; i <= argsLen; i++) {
          if (this[i] !== undefined) {
            this[i + argsLen] = this[i];
            this[i] = arguments[count];
            count++;
          } else {
            this[i] = arguments[count];
            count++;
          }
        }
      }
    }

    return result;
  };
}

module.exports = applyCustomSplice;
