'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    if (arguments.length === 0) {
      return [];
    }

    const sourceArray = [...this];
    const length = this.length;
    const addLength = [...items].length;
    let realStart = 0;

    if (+start >= 0) {
      realStart = (+start <= length) ? +start : length;
    } else if (+start < 0) {
      realStart = (+start >= -length) ? length + +start : 0;
    } else {
      realStart = 0;
    }

    let end;

    if (deleteCount !== undefined
        && deleteCount > 0
        && realStart + deleteCount <= length) {
      end = realStart + deleteCount;
    } else if (deleteCount === undefined
      || realStart + deleteCount > length) {
      end = length;
    } else {
      end = realStart;
    }

    const deleteLength = end - realStart;
    const result = Array(deleteLength);

    for (let i = 0; i < deleteLength; i++) {
      result[i] = this[i + realStart];
    }

    const newLength = length - deleteLength + addLength;

    this.length = newLength;

    for (let i = 0; i < realStart; i++) {
      this[i] = sourceArray[i];
    }

    for (let i = realStart; i < realStart + addLength; i++) {
      this[i] = [...items][i - realStart];
    }

    for (let i = realStart + addLength; i < newLength; i++) {
      this[i] = sourceArray[i + deleteLength - addLength];
    }

    return result;
  };
}

applyCustomSplice();

module.exports = applyCustomSplice;
