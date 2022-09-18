'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function (
    start,
    deleteCount,
    ...items
  ) {
    if (arguments.length === 0) {
      return [];
    }

    let startPos = normalize(start, this.length, false);

    let deleteAmount = deleteCount;

    if (isNaN(deleteAmount)) {
      deleteAmount = 0;
    }

    if (deleteCount === undefined) {
      deleteAmount = this.length - startPos;
    }

    if (start === undefined && deleteCount === undefined) {
      deleteAmount = 0;
      startPos = this.length;
    }

    deleteAmount = deleteAmount < 0 ? 0 : deleteAmount;

    if (startPos === 0 && deleteAmount < 0) {
      deleteAmount = this.length;
    }

    const removedItems = this.slice2(startPos, startPos + deleteAmount);
    const leftRestItems = this.slice2(0, startPos);
    const rightRestItems = this.slice2(startPos + deleteAmount);
    const splicedCopy = [...leftRestItems, ...items, ...rightRestItems];

    this.length = 0;

    for (const item of splicedCopy) {
      this[this.length] = item;
    }

    return removedItems;
  };

  [].__proto__.slice2 = function (start = 0, end = this.length) {
    const slicedArr = [];

    const startIndex = normalize(start, this.length);
    const endIndex = normalize(end, this.length);

    for (let i = startIndex; i < endIndex; i++) {
      slicedArr[slicedArr.length] = this[i];
    }

    return slicedArr;
  };
}

const normalize = (index, length, sliceFlag = true) => {
  let validIndex = index;

  if (isNaN(index)) {
    validIndex = 0;
  }

  const indexFromLastElement = length + validIndex;

  let normalized = validIndex < 0 ? indexFromLastElement : validIndex;

  if (normalized < 0) {
    normalized = 0;
  }

  if (normalized > length) {
    normalized = sliceFlag ? length - 1 : length;
  }

  return normalized;
};

module.exports = applyCustomSplice;
