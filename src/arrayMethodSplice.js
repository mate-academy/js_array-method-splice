'use strict';

/**
 * Implement method Splice
 */
function setStartingPoint(start, array) {
  if (start > array.length) {
    return array.length;
  }

  if (start === undefined || start < (array.length * -1)) {
    return 0;
  }

  if (start < 0) {
    return start + array.length;
  }

  return start;
}

function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    const removedValues = [];
    const startIndex = setStartingPoint(start, this);
    const howManyDelete = deleteCount;
    const addItems = items;

    // case if splice without arguments or deleteCount < 0
    if (arguments.length === 0 || howManyDelete < 0) {
      return removedValues;
    }

    // case if first two arguments === undefined
    if (start === undefined && deleteCount === undefined && !addItems.length) {
      return removedValues;
    }

    // case if all three arguments === undefined
    if (start === undefined
      && deleteCount === undefined
      && addItems[0] === undefined) {
      const reserved = [];

      for (let i = 0; i < this.length; i++) {
        reserved[i] = this[i];
      }

      this[0] = addItems[0];
      this.length++;

      for (let i = 1; i < this.length; i++) {
        this[i] = reserved[i - 1];
      }

      return removedValues;
    }

    // case, when func receiving start index and adding elements
    if (howManyDelete <= 0 && addItems.length !== 0) {
      for (let i = this.length - 1; i >= startIndex; i--) {
        this[i + addItems.length] = this[i];
      }

      for (let i = 0; i < addItems.length; i++) {
        this[i + startIndex] = addItems[i];
      }

      return removedValues;
    }

    // case if only start point received
    if (howManyDelete === undefined && addItems.length === 0) {
      let v = 0;

      for (let i = startIndex; i < this.length; i++) {
        removedValues[v] = this[i];
        v++;
      }
      this.length -= removedValues.length;

      return removedValues;
    }

    return replaceElems(
      removedValues, startIndex, howManyDelete, addItems, this
    );
  };
}

function replaceElems(deleted, startIndex, howManyDelete, addItems, array) {
  for (let i = 0; i < howManyDelete; i++) {
    deleted[i] = array[startIndex + i];
  }

  const afterArr = [];
  let v = 0;

  for (let i = startIndex + howManyDelete; i < array.length; i++) {
    afterArr[v] = array[i];
    v++;
  }

  if (addItems.length === 0) {
    for (let i = startIndex; i < array.length; i++) {
      array[i] = afterArr[i - startIndex];
    }

    array.length -= deleted.length;

    return deleted;
  }

  if (addItems.length > howManyDelete) {
    array.length += addItems.length - howManyDelete;
  }

  if (addItems.length < howManyDelete) {
    array.length -= howManyDelete - addItems.length;
  }

  for (let i = startIndex; i < startIndex + addItems.length; i++) {
    array[i] = addItems[i - startIndex];
  }

  for (let i = startIndex + addItems.length; i < array.length; i++) {
    array[i] = afterArr[i - (startIndex + addItems.length)];
  }

  return deleted;
}

module.exports = applyCustomSplice;
